import { Component } from '@angular/core';
import { LoadingController,IonicPage, NavController, NavParams ,Modal, ModalController, ModalOptions ,ToastController} from 'ionic-angular';
import { Api } from '../../providers';
import { SocialSharing } from '@ionic-native/social-sharing';
import { environment as ENV } from '../../environments/environment';
/**
 * Generated class for the ViewOrgaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-orga',
  templateUrl: 'view-orga.html',
})
export class ViewOrgaPage {
  public orga_id : any;
  public responseDataDetail:any;
  public bind_arr_orga:any;
  public url : string = ENV.baseUrl;
  constructor(public loadingCtrl: LoadingController,private socialSharing: SocialSharing,public toastCtrl : ToastController,public authService:Api,public modal:ModalController, public navCtrl: NavController, public navParams: NavParams) {
    this.orga_id = this.navParams.get('team_id');
    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
    let getteamDetail = new FormData();
    getteamDetail.append('org_id',this.orga_id);
    getteamDetail.append('service_type','orga_pagedetail');
    this.authService.postData(getteamDetail,'user.php').then((resultdetail) => {
      loading.dismiss();
      this.responseDataDetail = resultdetail;
      if(this.responseDataDetail.status == 'success'){
        this.bind_arr_orga = this.responseDataDetail.bind_arr_orga;
        //console.log('org_details',this.responseDataDetail);
      } else {
        this.tost_message(this.responseDataDetail.reason);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalViewPage');
  }

  openDonation(){
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };
    const myModalData = {
      id: this.orga_id,
    };
    const myModal: Modal = this.modal.create('OrgaMembersviewPage',{'data':myModalData}, myModalOptions);
    myModal.present();
    myModal.onDidDismiss((data) => {
      //console.log('Data',data);
      //console.log("I have dismissed.");
    });
    myModal.onWillDismiss((data) => {
      //console.log('Data',data);
      //console.log("I'm about to dismiss");
    });
  }

  openOrgaTeam(){
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };
    const myModalData = {
      id: this.orga_id,
    };
    const myModal: Modal = this.modal.create('OrgaTeamsviewPage',{'data':myModalData}, myModalOptions);
    myModal.present();
    myModal.onDidDismiss((data) => {
      //console.log('Data',data);
      //console.log("I have dismissed.");
    });
    myModal.onWillDismiss((data) => {
      //console.log('Data',data);
      //console.log("I'm about to dismiss");
    });
  }

  openOrgaDonation(){
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };
    const myModalData = {
      id: this.orga_id,
    };
    const myModal: Modal = this.modal.create('OrgaDonationviewPage',{'data':myModalData}, myModalOptions);
    myModal.present();
    myModal.onDidDismiss((data) => {
      //console.log('Data',data);
      //console.log("I have dismissed.");
    });
    myModal.onWillDismiss((data) => {
      //console.log('Data',data);
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

  share(msg,subject,url){
    //console.log(msg +  subject + url);
    this.socialSharing.share(msg, subject, null , url).then(() => {
      // Success!
    }).catch(() => {
      this.tost_message('Unable To Share.');
    });
  }

}
