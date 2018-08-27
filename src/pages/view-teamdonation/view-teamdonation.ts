import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController ,ToastController} from 'ionic-angular';
import { Api } from '../../providers';

/**
 * Generated class for the ViewTeamdonationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-teamdonation',
  templateUrl: 'view-teamdonation.html',
})
export class ViewTeamdonationPage {
  public getdata : any;
  public responseDataDetail:any;
  public donation_table_result:any;
  constructor(public toastCtrl: ToastController,public authService:Api,public navCtrl: NavController, public navParams: NavParams,public view:ViewController) {
    this.getdata = this.navParams.get('data');
    //console.log(this.getdata);
    let getteamDetail = new FormData();
    getteamDetail.append('team_id',this.getdata.id);
    getteamDetail.append('service_type','team_pagedetail');
    this.authService.postData(getteamDetail,'user.php').then((resultdetail) => {
      this.responseDataDetail = resultdetail;
      if(this.responseDataDetail.status == 'success'){
        this.donation_table_result = this.responseDataDetail.donation_table_result;
        //console.log('team_details',this.donation_table_result);
      } else {
        this.tost_message(this.responseDataDetail.reason);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewTeamdonationPage');
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
