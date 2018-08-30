import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,LoadingController } from 'ionic-angular';
import { Api } from '../../providers';
import { AbstractControl , Validators, FormBuilder, FormGroup, FormControl} from '@angular/forms';

/**
 * Generated class for the ContactUsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
})
export class ContactUsPage {
  public contactform: FormGroup;
  public fullname:AbstractControl;
  public email:AbstractControl;
  public subject:AbstractControl;
  public message:AbstractControl;
  public responseData:any;
  constructor(public loadingCtrl:LoadingController,public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public navParams: NavParams,
    public serviceApi: Api,
    public toastCtrl: ToastController
  ) {
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.contactform = new FormGroup({
      fullname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
      subject: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required]),
    });
  }

  ionViewDidLoad() {
  }

  contactNow(value:any){
    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
    let contactnow = new FormData();
    contactnow.append('service_type','password_change');
    contactnow.append('fullname',value.fullname);
    contactnow.append('email',value.email);
    contactnow.append('subject',value.subject);
    contactnow.append('message',value.message);
    this.serviceApi.postData(contactnow,'user.php').then((resultdetail) => {
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
