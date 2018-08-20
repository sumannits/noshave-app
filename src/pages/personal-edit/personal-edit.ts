import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the PersonalEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal-edit',
  templateUrl: 'personal-edit.html',
})
export class PersonalEditPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public view: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalEditPage');
  }

  closeModal() {
    this.view.dismiss();
  }

}
