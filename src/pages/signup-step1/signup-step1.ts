import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,MenuController} from 'ionic-angular';

/**
 * Generated class for the SignupStep1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup-step1',
  templateUrl: 'signup-step1.html',
})
export class SignupStep1Page {
  constructor(public menu:MenuController, public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
    this.menu.enable(false);
  }
  gotosignuppage1(){
    this.navCtrl.push('SignupPage');
  }
  returntologin(){
    this.navCtrl.setRoot('LoginPage');
  }
}
