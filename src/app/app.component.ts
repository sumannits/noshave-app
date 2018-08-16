import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';
import { Ionic2RatingModule } from 'ionic2-rating';
import { AppRate } from '@ionic-native/app-rate';
import { Broadcaster } from '../providers/eventEmitter';
import * as firebase from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';
import { Api, ResponseMessage } from '../providers';


export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  //tabComponent?: any;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage :any;
  public username: string = '';
  public profile_image: string = '';
  public isloggedin: boolean = false;
  public loguser: any;
  public loguserDet: any;
  public istype:any;
  public firstname:any;
  public lastname:any;
  public chatCntlist = [];

  @ViewChild(Nav) nav: Nav;

  withoutLoginPages: PageInterface[] = [
    { title: 'Home', name: 'HomePage', component: 'HomePage', index: 0, icon: 'home' },
    { title: 'Login', name: 'LoginPage', component: 'LoginPage', index: 3, icon: 'log-in' },
    { title: 'Signup', name: 'SignupPage', component: 'SignupPage', index: 5, icon: 'person-add' }
   
  ];

  withLoginPages: PageInterface[] = [
    { title: 'Home', name: 'HomePage', component: 'HomePage', index: 0, icon: 'home' },
    { title: 'Settings', name: 'SettingsPage', component: 'SettingsPage', index: 2, icon: 'settings' },
    { title: 'Order List', name: 'OrderListPage', component: 'OrderListPage', index: 3, icon: 'reorder' },
    { title: 'Chat', name: 'ChatlistPage', component: 'ChatlistPage', index: 9, icon: 'chatbubbles' },
    { title: 'Logout', name: 'LogoutPage', component: 'LoginPage', index: 6, icon: 'log-out' }

  ];




  constructor(private translate: TranslateService, platform: Platform, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen,public db: AngularFirestore,public serviceApi: Api,
  private broadCaster:Broadcaster) {
     

    platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if(localStorage.getItem('userPrfDet')){
        this.loguserDet = JSON.parse(localStorage.getItem('userPrfDet'));
      if(this.loguserDet.user_type==0){
        this.rootPage ="SignupStep1Page";
      }
    }
      else{
        this.isloggedin=false;
        this.rootPage ="SignupStep1Page";
      }
    
    });
    this.initTranslate(); 
    //firebase.initializeApp(configFirebase);
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  menuOpened() {
    let isUserLogedin = localStorage.getItem('isUserLogedin');
    if (isUserLogedin == '1') {
      this.isloggedin = true;
      this.loguserDet = JSON.parse(localStorage.getItem('userPrfDet'));
      if(this.loguserDet.user_type==1){
        this.istype=1;
      }else if(this.loguserDet.user_type==0){
        this.istype=0;
      }
    
      if (this.loguserDet.first_name) {
        this.username = this.loguserDet.first_name;
      }
    } else {
      //this.profile_image = 'assets/img/default.jpeg';
      this.username = '';
      this.isloggedin = false;
    }
    //console.log(this.isloggedin);
  }
  logintype(){
     this.loguser =  JSON.parse(localStorage.getItem('userPrfDet'));   
     if(this.loguser){
       this.firstname=this.loguser.first_name;
       this.lastname=this.loguser.last_name;
       
       //console.log("USERINFOOOOO",this.loguser.type);
     if(this.loguser.user_type==1){
       this.istype=1;
     }else if(this.loguser.user_type==0){
       this.istype=0;
     }
     }
   
   }
  openPage(page) {
    // if (page.name == 'LogoutPage') {
    //   localStorage.clear();
    //   this.isloggedin = false;
    //   // this.nav.setRoot('LoginPage');
    //   localStorage.removeItem("isUserLogedin");
    //   localStorage.removeItem("userPrfDet");
    //   this.nav.setRoot(page.component);
    // } else {
    //   this.nav.setRoot(page.component);
    // }
    this.nav.setRoot('TrackDetailsPage');

  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];
    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }

  

 
}


