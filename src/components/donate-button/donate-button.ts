import { Component ,Input } from '@angular/core';
import { MenuController } from 'ionic-angular';
import { environment as ENV } from '../../environments/environment' ;
import { ThemeableBrowser, ThemeableBrowserOptions } from '@ionic-native/themeable-browser';
import { Keyboard } from '@ionic-native/keyboard';
/**
 * Generated class for the DonateButtonComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */

@Component({
  selector: 'donate-button',
  templateUrl: 'donate-button.html',
})
export class DonateButtonComponent {
  public url : string = ENV.baseUrl;
  public viewDonate : boolean = false;
  @Input() donateType : string;
  @Input() id : string;
  @Input() viewdonate : any ;
  text: string;

  constructor(private keyboard: Keyboard,public menu: MenuController,private themeableBrowser: ThemeableBrowser) {
    this.keyboard.hideKeyboardAccessoryBar(false);
  }

  ngOnInit() {
    if(this.viewdonate !=undefined && this.viewdonate == '1'){
      this.viewDonate = true;
    }
    this.keyboard.hideKeyboardAccessoryBar(false);
  }

  gotosite(){
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
    if(this.donateType == 'normal'){
      //this.keyboard.hideKeyboardAccessoryBar(false);
      //this.iab.create(this.url + 'donate?type=webview');
      this.themeableBrowser.create(this.url + 'donate?type=webview', '_blank', options);
    }
    if(this.donateType == 'member'){
      //this.keyboard.hideKeyboardAccessoryBar(false);
      //this.iab.create(this.url + 'donate?id='+this.id+'&c=1&type=webview');
      this.themeableBrowser.create(this.url + 'donate?id='+this.id+'&c=1&type=webview', '_blank', options);
    }
    if(this.donateType == 'team'){
      //this.keyboard.hideKeyboardAccessoryBar(false);
      //this.iab.create(this.url + 'donate?id='+this.id+'&c=2&type=webview');
      this.themeableBrowser.create(this.url + 'donate?id='+this.id+'&c=2&type=webview', '_blank', options);
    }
    if(this.donateType == 'orga'){
      //this.keyboard.hideKeyboardAccessoryBar(false);
      //this.iab.create(this.url + 'donate?id='+this.id+'&c=3&type=webview');
      this.themeableBrowser.create(this.url + 'donate?id='+this.id+'&c=3&type=webview', '_blank', options);
    }
  }

  ionViewDidLoad(){

  }

}
