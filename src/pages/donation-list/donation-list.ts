import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController} from 'ionic-angular';
import { Api } from '../../providers';
/**
 * Generated class for the DonationListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-donation-list',
  templateUrl: 'donation-list.html',
})
export class DonationListPage {
  public doantionlist:any;
  public doantionlistarray:any;
  public teamlistarray:any;
  public org_donation:any;
  public switch : string = 'member';
  constructor(public toastCtrl:ToastController,public authService:Api,public navCtrl: NavController, public navParams: NavParams) {
    //Get Team By User Id
    let doantion = new FormData();
    doantion.append('user_id',JSON.parse(localStorage.getItem('userData')).m_id);
    doantion.append('service_type','donation_page');
    this.authService.postData(doantion,'user.php').then((result) => {
      this.doantionlist = result;
      if(this.doantionlist.status == 'success'){
          console.log(this.doantionlist);
          this.doantionlistarray = this.doantionlist.personal_donation;
          this.teamlistarray = this.doantionlist.team_donation;
          this.org_donation = this.doantionlist.org_donation;
      } else {
        this.tost_message(this.doantionlist.reason);
      }
    });
  }

  ionViewDidLoad() {
  }

  tost_message(msg){
    let toast = this.toastCtrl.create({
     message: msg,
     duration: 3000
   });
   toast.present();
  }

  gotoView(type,id){
    if(type == 1){
      this.navCtrl.push('PersonalViewPage',{'id':id});
    }

    if(type == 2){
      this.navCtrl.push('ViewTeamPage',{'team_id':id});
    }

    if(type == 3){
      this.navCtrl.push('ViewOrgaPage',{'team_id':id});
    }
  }

}
