import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController, Events ,ToastController ,MenuController } from 'ionic-angular';
import { AbstractControl,FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Api } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
 
  // Our translated text strings
  public signinform:FormGroup;
  public email:AbstractControl;
  public password:AbstractControl;
  public responseData:any;
  public responseDataDetail : any;
  public navdata:any;
  constructor(public toastCtrl:ToastController,
    public events: Events,
    public loadingCtrl: LoadingController,
    public builder:FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    public menu: MenuController,
    public userService: Api,) {
  
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.signinform = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
    });
    this.email = this.signinform.controls['email'];
    this.password = this.signinform.controls['password'];
  }

  ionViewDidLoad() {
    this.navdata = this.navParams.get('page');
    console.log(this.navdata);
    this.menu.enable(false);
  }

  signin(value:any){
    if (this.signinform.valid) {
      let formData = new FormData();
      formData.append('email_or_username',value.email);
      formData.append('password', value.password);
      formData.append('service_type', 'login');
      this.userService.postData(formData,'login.php').then((result) => {
        this.responseData = result;
        if(this.responseData.status == 'success')
        {
          let getuserDetail = new FormData();
          getuserDetail.append('user_id',this.responseData.user_id);
          getuserDetail.append('service_type','user_details');
          this.userService.postData(getuserDetail,'login.php').then((resultdetail) => {
            this.responseDataDetail = resultdetail;
            if(this.responseDataDetail.status == 'success'){
              //creating user:created Event Handeler
              if(this.navdata && this.navdata =='returning'){
                //console.log('Nav Data Test2',this.navdata);
                this.navCtrl.push('ProfileReviewPage',{'user_id':this.responseDataDetail.user_details.m_id});
              } else if(this.navdata === undefined) {
                this.createUser(this.responseDataDetail.user_details);
                localStorage.setItem('userData', JSON.stringify(this.responseDataDetail.user_details));
                this.navCtrl.setRoot('DashboardPage');
              }
            } else {
              this.tost_message(this.responseDataDetail.reason);
            }
          });
        } else {
          this.tost_message(this.responseData.reason);
        }
      }, (err) => {
        console.log(err);
        // Error log
      });
    }
  }

  createaccount(){
    this.navCtrl.setRoot('SignupStep1Page');
  }

  forgotpassword(){
    this.navCtrl.setRoot('ForgotPasswordPage');
  }

  tost_message(msg){
    let toast = this.toastCtrl.create({
     message: msg,
     duration: 3000
   });
   toast.present(); 
  }

  createUser(user) {
    this.events.publish('user:created', user);
  }
}
