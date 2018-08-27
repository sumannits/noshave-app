import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController} from 'ionic-angular';
import { Api } from '../../providers';
/**
 * Generated class for the LeaderboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leaderboard',
  templateUrl: 'leaderboard.html',
})
export class LeaderboardPage {
  public switch : string;
  public responseDataDetail:any;
  public member_arr:any;
  public team_arr:any;
  public org_arr:any;
  constructor(public toastCtrl:ToastController,public authService:Api,public navCtrl: NavController, public navParams: NavParams) {
    this.switch = 'member';
    let getleader = new FormData();
    getleader.append('service_type','leaderboard_page');
    this.authService.postData(getleader,'user.php').then((resultdetail) => {
      this.responseDataDetail = resultdetail;
      if(this.responseDataDetail.status == 'success'){
          console.log('this.responseDataDetail',this.responseDataDetail);
          this.member_arr = this.responseDataDetail.member_arr;
          this.team_arr = this.responseDataDetail.team_arr;
          this.org_arr = this.responseDataDetail.org_arr;
      } else {
        this.tost_message(this.responseDataDetail.reason);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaderboardPage');
  }

  tost_message(msg){
    let toast = this.toastCtrl.create({
     message: msg,
     duration: 3000
   });
   toast.present();
  }

  goTo(type,id){
    if(type==1){
      this.navCtrl.push('PersonalViewPage',{'id':id});
    }
    if(type==2){
      this.navCtrl.push('ViewTeamPage',{'team_id':id});
    }
    if(type==3){
      this.navCtrl.push('ViewOrgaPage',{'team_id':id});
    }
  }

}
