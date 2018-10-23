import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ThemeableBrowser, ThemeableBrowserOptions } from '@ionic-native/themeable-browser';
import { environment as ENV } from '../../environments/environment' ;
//import { SafariViewController } from '@ionic-native/safari-view-controller';
/**
 * Generated class for the AfterSplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-after-splash',
  templateUrl: 'after-splash.html',
})
export class AfterSplashPage {
  public url : string = ENV.baseUrl;
  constructor(//private safariViewController: SafariViewController,
    private themeableBrowser: ThemeableBrowser,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AfterSplashPage');
  }

  gopage(id){
    if(id == '1'){
      this.navCtrl.setRoot('LoginPage');
    }
    if(id == '2'){
      this.navCtrl.setRoot('SignupStep1Page');
    }
  }

  donate(){
    const options: ThemeableBrowserOptions = {
      toolbar: {
          height: 57,
          color: '#ede7db'
      },
      title: {
        color: '#3b2c19',
        staticText:'DONATE',
        showPageTitle: false
      },
      closeButton: {
          wwwImage: 'assets/img/close.png',
          imagePressed: 'close_pressed',
          align: 'right',
          event: 'closePressed',
      },
      backButtonCanClose: true
    };
    this.themeableBrowser.create(this.url + 'donate?type=webview', '_blank', options);
    /*this.safariViewController.isAvailable().then((available: boolean) => {
      if (available) {
        this.safariViewController.show({
          url: this.url + 'donate?type=webview',
          hidden: false,
          animated: false,
          transition: 'curl',
          enterReaderModeIfAvailable: true,
          tintColor: '#ff0000'
        })
        .subscribe((result: any) => {
            if(result.event === 'opened') console.log('Opened');
            else if(result.event === 'loaded') console.log('Loaded');
            else if(result.event === 'closed') console.log('Closed');
          },
          (error: any) => console.error(error)
        );

      } else {
        // use fallback browser, example InAppBrowser
      }
    });*/
  }

}
