import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Api } from '../../providers';
import { AbstractControl,Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  public forgotform:FormGroup;
  public email:AbstractControl;
  public responseData:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public serviceApi: Api,
    private fbuilder: FormBuilder,
    public toastCtrl: ToastController
  ) {

    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.forgotform = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
    });
  }

  ionViewDidLoad() {

  }

  doForgotPassword(frmdata:any){
    let forgotpass = new FormData();
    forgotpass.append('change','forgot');
    forgotpass.append('email',frmdata.email);
    forgotpass.append('service_type','password_change');
    this.serviceApi.postData(forgotpass,'user.php').then((resultdetail) => {
      this.responseData = resultdetail;
      if(this.responseData.status == 'success'){
        this.tost_message(this.responseData.msg);
        this.navCtrl.setRoot('LoginPage');
      } else {
        this.tost_message(this.responseData.reason);
      }
    });
  }
  
  public back(){
    this.navCtrl.setRoot('LoginPage');
  }

  tost_message(msg){
    let toast = this.toastCtrl.create({
     message: msg,
     duration: 3000
   });
   toast.present(); 
  }
}
