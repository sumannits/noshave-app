import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController ,ToastController} from 'ionic-angular';
import { Api } from '../../providers';

/**
 * Generated class for the OrgaMembersviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orga-membersview',
  templateUrl: 'orga-membersview.html',
})
export class OrgaMembersviewPage {
  public getdata : any;
  public responseDataDetail:any;
  public total_member:any;
  constructor(public toastCtrl: ToastController,public authService:Api,public navCtrl: NavController, public navParams: NavParams,public view:ViewController) {
    this.getdata = this.navParams.get('data');
    //console.log(this.getdata);
    let getteamDetail = new FormData();
    getteamDetail.append('org_id',this.getdata.id);
    getteamDetail.append('service_type','orga_pagedetail');
    this.authService.postData(getteamDetail,'user.php').then((resultdetail) => {
      this.responseDataDetail = resultdetail;
      if(this.responseDataDetail.status == 'success'){
        this.total_member = this.responseDataDetail.total_member;
        console.log('team_details',this.responseDataDetail);
      } else {
        this.tost_message(this.responseDataDetail.reason);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrgaMembersviewPage');
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
