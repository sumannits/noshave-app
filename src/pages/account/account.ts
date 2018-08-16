import { Component } from '@angular/core';
import { AlertController, NavController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  username: string;

  constructor(public alertCtrl: AlertController, public nav: NavController) {

  }

  ngAfterViewInit() {

  }

}
