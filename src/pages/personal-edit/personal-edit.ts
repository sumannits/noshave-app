import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams ,LoadingController ,ToastController ,ActionSheetController ,ViewController } from 'ionic-angular';
import { AbstractControl,FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Api } from '../../providers';

/**
 * Generated class for the PersonalEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal-edit',
  templateUrl: 'personal-edit.html',
})
export class PersonalEditPage {
  public response :any;
  public editfrom:FormGroup;
  public email:AbstractControl;
  public full_name:AbstractControl;
  public city:AbstractControl;
  public state:AbstractControl;
  public country:AbstractControl;
  public location_format:AbstractControl;
  public location_visibility:AbstractControl;
  public responseDataDetail:any;
  constructor(public app:App,
    public navCtrl: NavController,
    public navParams: NavParams,
    public view: ViewController,
    public toastCtrl:ToastController,
    public authService:Api,
    public loadingCtrl: LoadingController,
    public builder:FormBuilder,
    public actionSheetCtrl: ActionSheetController) {
      this.editfrom = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
        location_visibility: new FormControl(''),
        location_format: new FormControl(''),
        page_title: new FormControl('', [Validators.required]),
        fundraising_goal: new FormControl('',[Validators.required]),
        description: new FormControl('',[Validators.required])
      });
    }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad PersonalEditPage');
    const loguser = JSON.parse(localStorage.getItem('userData'));
    this.getprofileById(loguser.m_id);
  }

  closeModal() {
    this.view.dismiss();
  }

  getprofileById(id){
    let getuserDetail = new FormData();
    getuserDetail.append('user_id',id);
    getuserDetail.append('service_type','user_details');
    this.authService.postData(getuserDetail,'login.php').then((resultdetail) => {
      this.responseDataDetail = resultdetail;
      if(this.responseDataDetail.status == 'success'){
        this.editfrom.controls['username'].setValue(this.responseDataDetail.user_details.m_username);
        this.editfrom.controls['description'].setValue(this.responseDataDetail.user_details.m_page_description);
        this.editfrom.controls['fundraising_goal'].setValue(this.responseDataDetail.user_details.m_page_goal);
        this.editfrom.controls['page_title'].setValue(this.responseDataDetail.user_details.m_page_title);
        if(this.responseDataDetail.user_details.m_display_location == 1){
          this.editfrom.controls['location_visibility'].setValue(1);
        } else {
          this.editfrom.controls['location_visibility'].setValue(0);
        }

        if(this.responseDataDetail.user_details.m_location_format == 0){
          this.editfrom.controls['location_format'].setValue(0);
        } else if(this.responseDataDetail.user_details.m_location_format == 1) {
          this.editfrom.controls['location_format'].setValue(1);
        } else if(this.responseDataDetail.user_details.m_location_format == 2) {
          this.editfrom.controls['location_format'].setValue(2);
        } else {
          this.editfrom.controls['location_format'].setValue(3);
        }
      } else {
        this.tost_message(this.responseDataDetail.reason);
      }
    });
  }

  EditFrom(value:any){
    const loguser1 = JSON.parse(localStorage.getItem('userData'));
    let upuserDetail = new FormData();
    upuserDetail.append('user_id',loguser1.m_id);
    upuserDetail.append('m_username_new',value.username);
    upuserDetail.append('m_location_visibility',value.location_visibility);
    upuserDetail.append('m_location_format',value.location_format);
    upuserDetail.append('m_page_title',value.page_title);
    upuserDetail.append('m_page_goal',value.fundraising_goal);
    upuserDetail.append('m_page_description',value.description);
    this.authService.postData(upuserDetail,'update_personal_page.php').then((result) => {
      this.response = result;
      if(this.response.status == 'success'){
        this.view.dismiss();
        this.app.getRootNav().setRoot('PersonalPage');
        this.tost_message('Personal Page Updated Sucessfully.');
      } else {
        this.tost_message(this.response.reason);
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
