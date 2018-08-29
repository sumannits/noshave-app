import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,LoadingController } from 'ionic-angular';
import { Api } from '../../providers';
import { AbstractControl , Validators, FormBuilder, FormGroup, FormControl ,ValidatorFn} from '@angular/forms';
/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to customize settings for the app.
 *
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
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
  public forgotform: FormGroup;
  public password:AbstractControl;
  public newpass:AbstractControl;
  public conf_pass:AbstractControl;
  public responseData:any;
  constructor(public loadingCtrl:LoadingController,public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public serviceApi: Api,
    public toastCtrl: ToastController
  ) {
    this.forgotform = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      newpass: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      conf_pass: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12), this.equalto('newpass')]),
    });
    this.password = this.forgotform.controls['password'];
    this.newpass = this.forgotform.controls['newpass'];
    this.conf_pass = this.forgotform.controls['conf_pass'];
  }

  ionViewDidLoad() {
  }

  changepass(value:any){
    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
    const loguser = JSON.parse(localStorage.getItem('userData'));
    let changepass = new FormData();
    changepass.append('change','change');
    changepass.append('service_type','password_change');
    changepass.append('email',loguser.m_email);
    changepass.append('old_password',value.password);
    changepass.append('new_password',value.newpass);
    this.serviceApi.postData(changepass,'user.php').then((resultdetail) => {
      loading.dismiss();
      this.responseData = resultdetail;
      if(this.responseData.status == 'success'){
        this.tost_message(this.responseData.msg);
      } else {
        this.tost_message(this.responseData.reason);
      }
    });
  }

  tost_message(msg){
    let toast = this.toastCtrl.create({
     message: msg,
     duration: 3000
   });
   toast.present();
  }
}
