import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,Modal, ModalController, ModalOptions} from 'ionic-angular';

/**
 * Generated class for the PersonalViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal-view',
  templateUrl: 'personal-view.html',
})
export class PersonalViewPage {

  constructor(public modal:ModalController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalViewPage');
  }

  openDonation(){
    console.log('gfgfgf');
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };
    const myModal: Modal = this.modal.create('ViewDonationPage', myModalOptions);
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

}
