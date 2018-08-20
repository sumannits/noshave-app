import { Component } from '@angular/core';
import { Modal, IonicPage, NavController, NavParams ,ModalController,ModalOptions} from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';

/**
 * Generated class for the DonationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-donation',
  templateUrl: 'donation.html',
})
export class DonationPage {
  public amount:any;
  public pay_method :any;
  public other:boolean=false;
  public user_id:any;
  constructor(public modal: ModalController,public menu:MenuController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.user_id = this.navParams.get('user_id');
    this.menu.enable(false);
  }

  showother(){
    this.other = true;
  }

  openModal() {
    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };
    const myModalData = {
      user_id: this.user_id,
    };
    const myModal: Modal = this.modal.create('AfterSkipPage', { data: myModalData },myModalOptions);
    myModal.present();
    // myModal.onDidDismiss((data) => {
    //   console.log("I have dismissed.");
    // });
    // myModal.onWillDismiss((data) => {
    //   console.log("I'm about to dismiss");
    // });
  }

}
