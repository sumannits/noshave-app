import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController ,ToastController} from 'ionic-angular';
import { Api } from '../../providers';
/**
 * Generated class for the ViewTeammemberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-teammember',
  templateUrl: 'view-teammember.html',
})
export class ViewTeammemberPage {
  public getdata : any;
  public responseDataDetail:any;
  public bind_arr_member:any;
  constructor(public toastCtrl: ToastController,public authService:Api,public navCtrl: NavController, public navParams: NavParams,public view:ViewController) {
    this.getdata = this.navParams.get('data');
    //console.log(this.getdata);
    let getteamDetail = new FormData();
    getteamDetail.append('team_id',this.getdata.id);
    getteamDetail.append('service_type','team_pagedetail');
    this.authService.postData(getteamDetail,'user.php').then((resultdetail) => {
      this.responseDataDetail = resultdetail;
      if(this.responseDataDetail.status == 'success'){
        this.bind_arr_member = this.responseDataDetail.bind_arr_member;
        //console.log('team_details',this.responseDataDetail);
      } else {
        this.tost_message(this.responseDataDetail.reason);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewTeammemberPage');
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

  gotomember(id){
    this.navCtrl.push('PersonalViewPage',{'id':id});
  }

}
