import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Modal, ModalController, ModalOptions ,ToastController} from 'ionic-angular';
import { Api } from '../../providers';
/**
 * Generated class for the ViewTeamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-team',
  templateUrl: 'view-team.html',
})
export class ViewTeamPage {
  public team_id:any;
  public responseDataDetail:any;
  public team_details:any;
  constructor(public toastCtrl : ToastController,public authService:Api,public modal:ModalController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.team_id = this.navParams.get('team_id');
    let getteamDetail = new FormData();
    getteamDetail.append('team_id',this.team_id);
    getteamDetail.append('service_type','team_pagedetail');
    this.authService.postData(getteamDetail,'user.php').then((resultdetail) => {
      this.responseDataDetail = resultdetail;
      if(this.responseDataDetail.status == 'success'){
        this.team_details = this.responseDataDetail.bind_arr_team;
        //console.log('team_details',this.team_details);
      } else {
        this.tost_message(this.responseDataDetail.reason);
      }
    });
  }

  openDonation(){
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };
    const myModalData = {
      id: this.team_id,
    };
    const myModal: Modal = this.modal.create('ViewTeammemberPage',{'data':myModalData}, myModalOptions);
    myModal.present();
    myModal.onDidDismiss((data) => {
      // console.log('Data',data);
      // console.log("I have dismissed.");
    });
    myModal.onWillDismiss((data) => {
      // console.log('Data',data);
      // console.log("I'm about to dismiss");
    });
  }

  openTeamDonation(){
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };
    const myModalData = {
      id: this.team_id,
    };
    const myModal: Modal = this.modal.create('ViewTeamdonationPage',{'data':myModalData}, myModalOptions);
    myModal.present();
    myModal.onDidDismiss((data) => {
      // console.log('Data',data);
      // console.log("I have dismissed.");
    });
    myModal.onWillDismiss((data) => {
      // console.log('Data',data);
      // console.log("I'm about to dismiss");
    });
  }

  tost_message(msg){
    let toast = this.toastCtrl.create({
     message: msg,
     duration: 3000
   });
   toast.present();
  }

  goToorga(){
    this.navCtrl.setRoot('OrganizationPage');
  }

}
