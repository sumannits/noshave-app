import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Modal, ModalController, ModalOptions,ToastController } from 'ionic-angular';
import { Api } from '../../providers';
import { environment as ENV } from '../../environments/environment' ;
/**
 * Generated class for the PersonalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal',
  templateUrl: 'personal.html',
})
export class PersonalPage {
  public responseDataDetail : any;
  public user_details:any;
  public url : string = ENV.baseUrl;
  public fbv:any;
  constructor(public authService:Api,public toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams,public modal: ModalController) {
    let getuserDetail = new FormData();
    getuserDetail.append('user_id',JSON.parse(localStorage.getItem('userData')).m_id);
    getuserDetail.append('service_type','user_details');
    this.authService.postData(getuserDetail,'login.php').then((resultdetail) => {
      this.responseDataDetail = resultdetail;
      if(this.responseDataDetail.status == 'success'){
        this.user_details = this.responseDataDetail.user_details
        //console.log(this.user_details);
      } else {
        this.tost_message(this.responseDataDetail.reason);
      }
    });
    this.fbv = JSON.parse(localStorage.getItem('userData')).m_id;
  }


  openModal(type) {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };
    // const myModalData = {
    //   type: type,
    // };
    const myModal: Modal = this.modal.create('PersonalSharePage', myModalOptions);
    myModal.present();
    myModal.onDidDismiss((data) => {
      console.log("I have dismissed.");
    });
    myModal.onWillDismiss((data) => {
      console.log("I'm about to dismiss");
    });
  }

  personaledit(){
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };
    // const myModalData = {
    //   type: type,
    // };
    const myModal: Modal = this.modal.create('PersonalEditPage', myModalOptions);
    myModal.present();
    myModal.onDidDismiss((data) => {
      console.log("I have dismissed.");
    });
    myModal.onWillDismiss((data) => {
      console.log("I'm about to dismiss");
    });
  }

  gotToview(){
    this.navCtrl.push('PersonalViewPage',{'id':this.fbv});
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
