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
  constructor(public toastCtrl:ToastController,public authService:Api,public navCtrl: NavController, public navParams: NavParams) {
    //Get Team By User Id
    let doantion = new FormData();
    doantion.append('user_id',JSON.parse(localStorage.getItem('userData')).m_id);
    doantion.append('service_type','donation_page');
    this.authService.postData(doantion,'user.php').then((result) => {
      this.doantionlist = result;
      if(this.doantionlist.status == 'success'){
          this.doantionlistarray = this.doantionlist.personal_donation;
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

}