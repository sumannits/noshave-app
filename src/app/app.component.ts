import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { Keyboard } from '@ionic-native/keyboard';
//import { StatusBar } from '@ionic-native/status-bar';
import { Nav, Platform ,MenuController,Events} from 'ionic-angular';
import { Api } from '../providers';
export interface PageInterface {
  title: string;
  name: string;
  component: any;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage :any = 'AfterSplashPage';
  public username: string = '';
  public profile_image: string = '';
  public isloggedin: boolean = false;
  public loguser: any;
  public loguserDet: any;
  public istype:any;
  public firstname:any;
  public lastname:any;
  public chatCntlist = [];
  public loggeduser_details:any;
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any, icon:string}>;
  constructor(//private keyboard: Keyboard,
      public events: Events,public menu: MenuController, platform: Platform,
     //private statusBar: StatusBar,
     private splashScreen: SplashScreen,public serviceApi: Api,) {
    this.pages = [
      { title: 'Home', component: 'DashboardPage', icon:'home' },
      { title: 'Personal', component: 'PersonalPage', icon:'document' },
      { title: 'Team', component: 'TeamPage', icon:'people' },
      { title: 'Organization', component: 'OrganizationPage', icon:'laptop' },
      { title: 'Donations', component: 'DonationListPage', icon:'card' },
      { title: 'Leaderboard', component: 'LeaderboardPage', icon:'aperture' },
      { title: 'Account', component: 'AccountPage', icon:'person' },
      { title: 'Previous Contributors', component: 'PreviousContributionPage', icon:'arrow-round-back' },
      //{ title: 'Settings', component: 'SettingsPage', icon:'settings' },
      //{ title: 'Help', component: 'ContactUsPage', icon:'help' },
      { title: 'Logout', component: '',icon:'power' }
    ];
    platform.ready().then(() => {
      //this.statusBar.styleDefault();
      //this.keyboard.hideKeyboardAccessoryBar(false);
      //this.keyboard.disableScroll(false);
      //this.keyboard.show();
      this.splashScreen.hide();
      const loguser = JSON.parse(localStorage.getItem('userData'));
      //console.log(loguser);
      if(loguser){
        this.rootPage = 'DashboardPage';
        this.isloggedin = true;
        //Enable Side Menu After Login
        this.menu.enable(true);
        this.loggeduser_details = loguser;
      }
      this.events.subscribe('user:created', (testuser) => {
        this.rootPage = 'DashboardPage';
        this.isloggedin = true;
        //Enable Side Menu After Login
        this.menu.enable(true);
        this.loggeduser_details = testuser;
      });
    });
  }

  openPage(page) {
    if (page.title == 'Logout') {
      this.logout();
    } else {
      this.nav.setRoot(page.component);
    }
  }

  isActive(page: PageInterface) {
    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }

  public logout(){
    localStorage.clear();
    this.isloggedin = false;
    this.nav.setRoot('AfterSplashPage');
  }

}


