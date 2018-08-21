import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Modal,ModalOptions,IonicPage, NavController, ToastController, AlertController,ModalController,LoadingController,MenuController } from 'ionic-angular';
import { Api } from '../../providers';
import { FormControl, ValidatorFn,Validators, FormGroup, AbstractControl } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  equalto(field_name): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      let input = control.value;
      let isValid=control.root.value[field_name]==input
      if(!isValid){
        return { 'equalTo': {isValid} }
      } else {
        return null;
      }
    };
  }
  public form: FormGroup;
  public email:AbstractControl;
  public full_name:AbstractControl;
  public city:AbstractControl;
  public state:AbstractControl;
  public country:AbstractControl;
  public password:AbstractControl;
  public conf_pass:AbstractControl;
  public responseData:any;
  constructor(
    public navCtrl: NavController,
    public userService: Api,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public modalCtrl: ModalController,
    public loadingCtrl:LoadingController,
    public serviceApi: Api,
    public menu:MenuController,
    public modal: ModalController,
  ) {
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.form = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      conf_pass: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12), this.equalto('password')]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
      full_name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      username: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
    });
  }

  doSignup(val : any) {
    let signup = new FormData();
    signup.append('service_type','signup');
    signup.append('password',val.password);
    signup.append('password_verify',val.conf_pass);
    signup.append('email_address',val.email);
    signup.append('full_name',val.full_name);
    signup.append('username',val.username);
    signup.append('city',val.city);
    signup.append('state',val.state);
    signup.append('country',val.country);
    this.serviceApi.postData(signup,'user.php').then((resultdetail) => {
      this.responseData = resultdetail;
      console.log('After Sign Up',this.responseData);
      if(this.responseData.status == 'success'){
        this.openModal(this.responseData.user_id);
        this.tost_message(this.responseData.msg);
        //this.navCtrl.push('DonationPage',{'user_id': this.responseData.user_id});
      } else {
        this.tost_message(this.responseData.reason);
      }
    });
  }

  ionViewDidLoad() {
    this.menu.enable(false);
  }

  tost_message(msg){
    let toast = this.toastCtrl.create({
     message: msg,
     duration: 3000
    });
    toast.present(); 
  }

  openModal(id) {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };
    const myModalData = {
      user_id: id,
    };
    const myModal: Modal = this.modal.create('AfterSkipPage', { data: myModalData },myModalOptions);
    myModal.present();
    myModal.onDidDismiss((data) => {
      console.log("I have dismissed.");
    });
    myModal.onWillDismiss((data) => {
      console.log("I'm about to dismiss");
    });
  }
}
