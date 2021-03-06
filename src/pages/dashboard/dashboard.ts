import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController} from 'ionic-angular';
import { Api } from '../../providers';
import { SocialSharing } from '@ionic-native/social-sharing';
import { environment as ENV } from '../../environments/environment';
/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  public responseDataDetail:any;
  public dashboardcontent:any;
  public user_data:any;
  public url : string = ENV.baseUrl;
  public Date : any;
  constructor(private socialSharing: SocialSharing,public toastCtrl:ToastController,public authService:Api ,public navCtrl: NavController, public navParams: NavParams) {
    let dashboard = new FormData();
    dashboard.append('user_id',JSON.parse(localStorage.getItem('userData')).m_id);
    dashboard.append('service_type','dashboard_page');
    this.authService.postData(dashboard,'user.php').then((resultdetail) => {
      this.responseDataDetail = resultdetail;
      if(this.responseDataDetail.status == 'success'){
        this.dashboardcontent = this.responseDataDetail;
      } else {
        this.tost_message(this.responseDataDetail.reason);
      }
    });
    this.user_data = JSON.parse(localStorage.getItem('userData'));
    //console.log('user_data',this.user_data);
  }

  ionViewDidLoad() {
    this.Date = new Date();
    //console.log(this.Date);
  }

  tost_message(msg){
    let toast = this.toastCtrl.create({
     message: msg,
     duration: 3000
   });
   toast.present();
  }

  gotoviewDonation(){
    this.navCtrl.setRoot('DonationListPage');
  }

  gotoviewMyPage(){
    this.navCtrl.setRoot('PersonalPage');
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
