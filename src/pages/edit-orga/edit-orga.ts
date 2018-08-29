import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController ,ToastController ,ActionSheetController ,ViewController ,App} from 'ionic-angular';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Api } from '../../providers';

/**
 * Generated class for the EditOrgaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-orga',
  templateUrl: 'edit-orga.html',
})
export class EditOrgaPage {
  public navdata : any;
  public response :any;
  public editfrom:FormGroup;
  public responseDataDetail:any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public view: ViewController,
    public toastCtrl:ToastController,
    public authService:Api,
    public loadingCtrl: LoadingController,
    public builder:FormBuilder,
    public actionSheetCtrl: ActionSheetController,public app:App) {
    this.editfrom = new FormGroup({
      teamname: new FormControl('', [Validators.required]),
      team_username: new FormControl('',[Validators.required]),
      team_title: new FormControl('',[Validators.required]),
      fundraising_goal: new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required])
    });
  }

  ionViewDidLoad() {
    this.navdata = this.navParams.get('data');
    this.getproTeamById(this.navdata.team_id);
  }

  closeModal() {
    this.view.dismiss();
  }

  getproTeamById(id){
    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
    let teamdetailsById = new FormData();
    teamdetailsById.append('user_id',JSON.parse(localStorage.getItem('userData')).m_id);
    teamdetailsById.append('service_type','organization_page');
    this.authService.postData(teamdetailsById,'user.php').then((resultstedetail) => {
      this.responseDataDetail = resultstedetail;
      loading.dismiss();
      if(this.responseDataDetail.status == 'success'){
        //console.log(this.responseDataDetail);
        this.editfrom.controls['teamname'].setValue(this.responseDataDetail.org_details.o_name);
        this.editfrom.controls['team_username'].setValue(this.responseDataDetail.org_details.o_username);
        this.editfrom.controls['team_title'].setValue(this.responseDataDetail.org_details.o_page_title);
        this.editfrom.controls['fundraising_goal'].setValue(this.responseDataDetail.org_details.o_page_goal);
        this.editfrom.controls['description'].setValue(this.responseDataDetail.org_details.o_page_description);
      } else {
        this.tost_message(this.responseDataDetail.reason);
      }
    });
  }

  EditFrom(value:any){
    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
    const loguser1 = JSON.parse(localStorage.getItem('userData'));
    let upuserDetail = new FormData();
    upuserDetail.append('user_id',loguser1.m_id);
    upuserDetail.append('o_name',value.teamname);
    upuserDetail.append('o_username',value.team_username);
    upuserDetail.append('o_page_title',value.team_title);
    upuserDetail.append('o_page_goal',value.fundraising_goal);
    upuserDetail.append('o_page_description',value.description);
    this.authService.postData(upuserDetail,'update_org_page.php').then((result) => {
      loading.dismiss();
      this.responseDataDetail = result;
      if(this.responseDataDetail.status == 'success'){
        this.view.dismiss();
        this.app.getRootNav().setRoot('OrganizationPage');
        this.tost_message('Organization Details Updated Sucessfully.');
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
