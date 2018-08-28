import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';
/**
 * Generated class for the PersonalSharePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personal-share',
  templateUrl: 'personal-share.html',
})
export class PersonalSharePage {

  constructor(private socialSharing: SocialSharing,public view: ViewController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalSharePage');
  }

  closeModal() {
    this.view.dismiss();
  }

  shareViaface(message,url){
    var msg  = 'Test';
    this.socialSharing.shareViaFacebook(msg, null, 'http://111.93.169.90/team2/noshave-new/dashboard');
  }

  test(){
    this.socialSharing.share('msg', null, 'http://111.93.169.90/team2/noshave-new/assets/images/logo.png', null).then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }

}
