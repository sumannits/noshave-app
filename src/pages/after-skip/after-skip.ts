import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController} from 'ionic-angular';

/**
 * Generated class for the AfterSkipPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-after-skip',
  templateUrl: 'after-skip.html',
})
export class AfterSkipPage {
  public buttontrue : boolean = false;
  public agree:any;
  public navdata : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public view: ViewController) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad AfterSkipPage');
    this.navdata = this.navParams.get('data');
    console.log(this.navdata);
  }

  closeModal() {
    this.view.dismiss();
  }
  agreetrue(){
    if(this.agree){
      this.buttontrue= true;
    } else {
      this.buttontrue= false;
    }
  }

  gotoreview(){
    localStorage.clear();
    this.view.dismiss();
    //this.navCtrl.push('ProfileReviewPage',{'user_id': this.navdata.user_id});
    this.navCtrl.setRoot('LoginPage',{'user_id': this.navdata.user_id});
  }
}
