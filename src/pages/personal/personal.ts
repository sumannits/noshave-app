import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , Modal, ModalController, ModalOptions,ToastController } from 'ionic-angular';
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

  constructor(public toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams,public modal: ModalController) {
  }


  openModal(type) {
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
    this.navCtrl.push('PersonalViewPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalPage');
  }

}
