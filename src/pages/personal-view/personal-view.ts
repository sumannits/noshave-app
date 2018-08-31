import { Component } from '@angular/core';
import { LoadingController,IonicPage, NavController, NavParams ,Modal, ModalController, ModalOptions,ToastController} from 'ionic-angular';
import { Api } from '../../providers';
import { SocialSharing } from '@ionic-native/social-sharing';
import { environment as ENV } from '../../environments/environment';
/**
 * Generated class for the PersonalViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal-view',
  templateUrl: 'personal-view.html',
})
export class PersonalViewPage {
  public loguser : any;
  public responseDataDetail:any;
  public user_details:any;
  public user_id : any;
  public url : string = ENV.baseUrl;
  public teamname: string;
  constructor(private socialSharing: SocialSharing,public loadingCtrl:LoadingController,public authService:Api,public modal:ModalController, public navCtrl: NavController,
    public navParams: NavParams,public toastCtrl:ToastController) {
    this.user_id = this.navParams.get('id');
    //console.log(this.user_id);
    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
    this.loguser = JSON.parse(localStorage.getItem('userData'));
    let getuserDetail = new FormData();
    getuserDetail.append('user_id',this.user_id);
    getuserDetail.append('service_type','personal_pagedetail');
    this.authService.postData(getuserDetail,'user.php').then((resultdetail) => {
      loading.dismiss();
      this.responseDataDetail = resultdetail;
      if(this.responseDataDetail.status == 'success'){
        this.user_details = this.responseDataDetail.personal_pagedetail;
        this.teamname = this.responseDataDetail.team_arr[0].t_name
      } else {
        this.tost_message(this.responseDataDetail.reason);
      }
    });
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad PersonalViewPage');
  }

  openDonation(){
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };
    const myModalData = {
      id: this.user_id,
    };
    const myModal: Modal = this.modal.create('ViewDonationPage',{'data':myModalData}, myModalOptions);
    myModal.present();
    myModal.onDidDismiss((data) => {
      // console.log('Data',data);
      // console.log("I have dismissed.");
    });
    myModal.onWillDismiss((data) => {
      // console.log('Data',data);
      // console.log("I'm about to dismiss");
    });
  }

  openModal() {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };
    // const myModalData = {
    //   type: type,
    // };
    const myModal: Modal = this.modal.create('PersonalSharePage', myModalOptions);
    myModal.present();
    myModal.onDidDismiss((data) => {
      //console.log("I have dismissed.");
    });
    myModal.onWillDismiss((data) => {
      //console.log("I'm about to dismiss");
    });
  }

  tost_message(msg){
    let toast = this.toastCtrl.create({
     message: msg,
     duration: 3000
   });
   toast.present();
  }

  gotoTeam(id){
    this.navCtrl.push('ViewTeamPage',{'team_id':id});
  }

  share(msg,subject,url){
    //console.log(msg +  subject + url);
    this.socialSharing.share(msg, subject, null , url).then(() => {
      // Success!
    }).catch(() => {
      this.tost_message('Unable To Share.');
    });
  }

}
