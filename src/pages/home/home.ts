import { Component } from '@angular/core';
import { MenuController, IonicPage, NavController, NavParams, AlertController, ToastController} from 'ionic-angular';
import { Api } from '../../providers';
import {MyApp} from '../../app/app.component';
/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public responseData : any;
  public donation : any;
  public userDetailsJson:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public serviceApi: Api,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public myApp:MyApp,
    public menu: MenuController,
  ){
    this.userDetailsJson = JSON.parse(localStorage.getItem('userData'));
    let getHomedata = new FormData();
    getHomedata.append('user_id',this.userDetailsJson.m_id);
    getHomedata.append('m_page_goal',this.userDetailsJson.m_page_goal);
    getHomedata.append('service_type','donations');
    this.serviceApi.postData(getHomedata,'user.php').then((resultdetail) => {
      this.responseData = resultdetail;
      if(this.responseData.status == 'success'){
        this.donation = this.responseData.personal_donation;
      } else {
        this.tost_message(this.responseData.reason);
      }
    });
  }

  ionViewDidLoad() {
    this.menu.enable(true);
  }

  tost_message(msg){
    let toast = this.toastCtrl.create({
     message: msg,
     duration: 3000
   });
   toast.present(); 
  }

  makedonate(){
    this.navCtrl.push('DonationPage');
  }
}
