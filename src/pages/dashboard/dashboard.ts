import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController} from 'ionic-angular';
import { Api } from '../../providers';
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
  constructor(public toastCtrl:ToastController,public authService:Api ,public navCtrl: NavController, public navParams: NavParams) {
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
