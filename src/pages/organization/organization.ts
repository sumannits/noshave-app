import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Modal, ModalController, ModalOptions,ToastController } from 'ionic-angular';
import { Api } from '../../providers';

/**
 * Generated class for the OrganizationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-organization',
  templateUrl: 'organization.html',
})
export class OrganizationPage {
  public teamdetailsByIdresult:any;
  public is_team_member : boolean;
  public is_team_owner : boolean;
  public team_details : any;
  constructor(public toastCtrl:ToastController,public authService:Api,public navCtrl: NavController, public navParams: NavParams,public modal: ModalController) {
    //Get Team By User Id
    let teamdetailsById = new FormData();
    teamdetailsById.append('user_id',JSON.parse(localStorage.getItem('userData')).m_id);
    teamdetailsById.append('service_type','team_page');
    this.authService.postData(teamdetailsById,'user.php').then((resultstedetail) => {
      this.teamdetailsByIdresult = resultstedetail;
      if(this.teamdetailsByIdresult.status == 'success'){
        this.is_team_member =  this.teamdetailsByIdresult.is_team_member;
        this.is_team_owner =  this.teamdetailsByIdresult.is_team_owner;
        this.team_details =  this.teamdetailsByIdresult.team_details;
      } else {
        this.tost_message(this.teamdetailsByIdresult.reason);
      }
    });
  }

  ionViewDidLoad() {
  }

  openModal(type) {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };
    const myModalData = {
      type: type,
    };
    const myModal: Modal = this.modal.create('CreateJoinOrganizationPage', { data: myModalData }, myModalOptions);
    myModal.present();
    myModal.onDidDismiss((data) => {
      console.log("I have dismissed.");
    });
    myModal.onWillDismiss((data) => {
      console.log("I'm about to dismiss");
    });
  }

  tost_message(msg){
    let toast = this.toastCtrl.create({
     message: msg,
     duration: 3000
   });
   toast.present(); 
  }

}
