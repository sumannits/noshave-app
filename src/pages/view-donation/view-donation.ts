import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController,ToastController} from 'ionic-angular';
import { Api } from '../../providers';
/**
 * Generated class for the ViewDonationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-donation',
  templateUrl: 'view-donation.html',
})
export class ViewDonationPage {
  public data :any;
  public responseDataDetail:any;
  public personal_donation_list : any;
  constructor(public toastCtrl : ToastController,public authService:Api,public view:ViewController ,public navCtrl: NavController, public navParams: NavParams) {
    this.data = this.navParams.get('data');
    let getuserDetail = new FormData();
    getuserDetail.append('user_id',this.data.id);
    getuserDetail.append('service_type','personal_pagedetail');
    this.authService.postData(getuserDetail,'user.php').then((resultdetail) => {
      this.responseDataDetail = resultdetail;
      if(this.responseDataDetail.status == 'success'){
        this.personal_donation_list = this.responseDataDetail.personal_donation_list;
        //console.log(this.personal_donation_list);
      } else {
        this.tost_message(this.responseDataDetail.reason);
      }
    });
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ViewDonationPage');
  }

  closeModal() {
    this.view.dismiss();
  }

  tost_message(msg){
    let toast = this.toastCtrl.create({
     message: msg,
     duration: 3000
   });
   toast.present();
  }

}
