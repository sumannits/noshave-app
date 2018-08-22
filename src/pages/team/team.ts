import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Modal, ModalController, ModalOptions,ToastController ,AlertController,MenuController} from 'ionic-angular';
import { Api } from '../../providers';
/**
 * Generated class for the TeamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-team',
  templateUrl: 'team.html',
})
export class TeamPage {
  public teamdetailsByIdresult:any;
  public is_team_member : boolean;
  public is_team_owner : boolean;
  public team_details : any;
  public leaveTeamresult:any;
  constructor(public toastCtrl:ToastController,public authService:Api,public navCtrl: NavController, public navParams: NavParams,public modal: ModalController,public alertCtrl:AlertController,public menuCtrl : MenuController) {
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
    console.log('Enable');
    this.menuCtrl.enable(true);
  }

  openModal(type) {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };
    const myModalData = {
      type: type,
    };
    const myModal: Modal = this.modal.create('CrateJoinTeamPage', { data: myModalData }, myModalOptions);
    myModal.present();
    myModal.onDidDismiss((data) => {
      console.log('Data',data);
      console.log("I have dismissed.");
    });
    myModal.onWillDismiss((data) => {
      console.log('Data',data);
      console.log("I'm about to dismiss");
    });
  }

  editTeam(team_id){
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };
    const myModalData = {
      team_id: team_id,
    };
    const myModal: Modal = this.modal.create('EditTeamPage',{ data: myModalData }, myModalOptions);
    myModal.present();
    myModal.onDidDismiss((data) => {
      //console.log("I have dismissed.");
    });
    myModal.onWillDismiss((data) => {
      //console.log("I'm about to dismiss");
    });
  }

  emailTeam(team_id){
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };
    const myModalData = {
      team_id: team_id,
    };
    const myModal: Modal = this.modal.create('EmailTeamPage',{ data: myModalData }, myModalOptions);
    myModal.present();
    myModal.onDidDismiss((data) => {
      //console.log("I have dismissed.");
    });
    myModal.onWillDismiss((data) => {
      //console.log("I'm about to dismiss");
    });
  }

  shareTeam(page,team_id){
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };
    const myModalData = {
      page : page,
      team_id: team_id,
    };
    const myModal: Modal = this.modal.create('ShareTeamPage',{ data: myModalData }, myModalOptions);
    myModal.present();
    myModal.onDidDismiss((data) => {
      //console.log("I have dismissed.");
    });
    myModal.onWillDismiss((data) => {
      //console.log("I'm about to dismiss");
    });
  }

  goToTeamView(id){
    this.navCtrl.push('ViewTeamPage',{'team_id':id});
  }

  tost_message(msg){
    let toast = this.toastCtrl.create({
     message: msg,
     duration: 3000
   });
   toast.present(); 
  }

  leaveTeam() {
    let alert = this.alertCtrl.create({
      title: 'Confirm Leave Team.',
      message: 'Are you sure to leave this team?',
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
            let leaveTeam = new FormData();
            leaveTeam.append('user_id',JSON.parse(localStorage.getItem('userData')).m_id);
            this.authService.postData(leaveTeam,'leave_team.php').then((results) => {
              this.leaveTeamresult = results;
              if(this.leaveTeamresult.status == 'success'){
                this.tost_message(this.leaveTeamresult.msg);
                this.navCtrl.setRoot('TeamPage');
              } else {
                this.tost_message(this.leaveTeamresult.reason);
              }
            });
          }
        }
      ]
    });
    alert.present();
  }

}
