import { Component } from '@angular/core';
import { LoadingController,AlertController,IonicPage, NavController, NavParams , Modal, ModalController, ModalOptions,ToastController } from 'ionic-angular';
import { Api } from '../../providers';
import { SocialSharing } from '@ionic-native/social-sharing';
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
  public leaveOrgaresult:any;
  constructor(public loadingCtrl:LoadingController,private socialSharing: SocialSharing,public alertCtrl:AlertController, public toastCtrl:ToastController,public authService:Api,public navCtrl: NavController, public navParams: NavParams,public modal: ModalController) {
    //Get Team By User Id
    let teamdetailsById = new FormData();
    teamdetailsById.append('user_id',JSON.parse(localStorage.getItem('userData')).m_id);
    teamdetailsById.append('service_type','organization_page');
    this.authService.postData(teamdetailsById,'user.php').then((resultstedetail) => {
      this.teamdetailsByIdresult = resultstedetail;
      if(this.teamdetailsByIdresult.status == 'success'){
        //console.log(this.teamdetailsByIdresult);
        this.is_team_member =  this.teamdetailsByIdresult.is_org_member;
        this.is_team_owner =  this.teamdetailsByIdresult.is_org_owner;
        this.team_details =  this.teamdetailsByIdresult.org_details;
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
      console.log(data);
      console.log("I have dismissed.");
    });
    myModal.onWillDismiss((data) => {
      console.log(data);
      console.log("I'm about to dismiss");
    });
  }

  leaveOrganization() {
    let alert = this.alertCtrl.create({
      title: 'Confirm Leave Organization.',
      message: 'Are you sure to leave this Organization?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            let loading = this.loadingCtrl.create({
              content: 'Please Wait...'
            });
            loading.present();
            let leaveTeam = new FormData();
            leaveTeam.append('user_id',JSON.parse(localStorage.getItem('userData')).m_id);
            this.authService.postData(leaveTeam,'leave_org.php').then((results) => {
              this.leaveOrgaresult = results;
              loading.dismiss();
              if(this.leaveOrgaresult.status == 'success'){
                this.tost_message('You have successfully leaved this organization.');
                this.navCtrl.setRoot('OrganizationPage');
              } else {
                this.tost_message(this.leaveOrgaresult.reason);
              }
            });
          }
        }
      ]
    });
    alert.present();
  }

  shareModal() {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };
    // const myModalData = {
    //   type: type,
    // };
    const myModal: Modal = this.modal.create('ShareOrgaPage', myModalOptions);
    myModal.present();
    myModal.onDidDismiss((data) => {
      console.log("I have dismissed.");
    });
    myModal.onWillDismiss((data) => {
      console.log("I'm about to dismiss");
    });
  }

  editOrga(team_id){
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };
    const myModalData = {
      team_id: team_id,
    };
    const myModal: Modal = this.modal.create('EditOrgaPage',{ data: myModalData }, myModalOptions);
    myModal.present();
    myModal.onDidDismiss((data) => {
      //console.log("I have dismissed.");
    });
    myModal.onWillDismiss((data) => {
      //console.log("I'm about to dismiss");
    });
  }

  tost_message(msg){
    let toast = this.toastCtrl.create({
     message: msg,
     duration: 3000
   });
   toast.present();
  }

  gotToview(id){
    this.navCtrl.push('ViewOrgaPage',{'team_id':id});
  }

  share(msg,subject,url){
    //console.log(msg +  subject + url);
    this.socialSharing.share(msg, subject, null , url).then(() => {
      // Success!
    }).catch(() => {
      this.tost_message('Unable To Share.');
    });
  }

}
