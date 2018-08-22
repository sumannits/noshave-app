import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';

/**
 * Generated class for the ShareTeamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-share-team',
  templateUrl: 'share-team.html',
})
export class ShareTeamPage {
  public navdata : any;
  constructor(public view: ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.navdata = this.navParams.get('data');
    console.log(this.navdata);
  }

  ionViewDidLoad() {
    
  }

  closeModal() {
    this.view.dismiss();
  }

}
