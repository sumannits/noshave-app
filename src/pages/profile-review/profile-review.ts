import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController ,ToastController ,ActionSheetController,Platform} from 'ionic-angular';
import { AbstractControl,FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Api } from '../../providers';
/**
 * Generated class for the ProfileReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-review',
  templateUrl: 'profile-review.html',
})
export class ProfileReviewPage {
  public response :any;
  public editfrom:FormGroup;
  public email:AbstractControl;
  public full_name:AbstractControl;
  public city:AbstractControl;
  public state:AbstractControl;
  public country:AbstractControl;
  public got_screened:AbstractControl;
  public responseDataDetail:any;
  public user_id :any;
  constructor(public toastCtrl:ToastController,
    public authService:Api,
    public loadingCtrl: LoadingController,
    public builder:FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController) {
      let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
      this.editfrom = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
        full_name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
        city: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        got_screened: new FormControl(''),
      });
  }

  ionViewDidLoad() {
    this.user_id = this.navParams.get('user_id');
    console.log(this.user_id);
    this.getprofileById(this.user_id);
  }

  getprofileById(id){
    let getuserDetail = new FormData();
    getuserDetail.append('user_id',id);
    getuserDetail.append('service_type','user_details');
    this.authService.postData(getuserDetail,'login.php').then((resultdetail) => {
      this.responseDataDetail = resultdetail;
      if(this.responseDataDetail.status == 'success'){
        this.editfrom.controls['full_name'].setValue(this.responseDataDetail.user_details.m_full_name);
        this.editfrom.controls['email'].setValue(this.responseDataDetail.user_details.m_email);
        this.editfrom.controls['city'].setValue(this.responseDataDetail.user_details.m_city);
        this.editfrom.controls['state'].setValue(this.responseDataDetail.user_details.m_state);
        this.editfrom.controls['country'].setValue(this.responseDataDetail.user_details.m_country);
      } else {
        this.tost_message(this.responseDataDetail.reason);
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
