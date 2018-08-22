import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController ,ToastController ,ActionSheetController ,ViewController ,App} from 'ionic-angular';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Api } from '../../providers';

/**
 * Generated class for the EmailTeamPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-email-team',
  templateUrl: 'email-team.html',
})
export class EmailTeamPage {
  public navdata : any;
  public response :any;
  public editfrom:FormGroup;
  public responseDataDetail:any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public view: ViewController,
    public toastCtrl:ToastController,
    public authService:Api,
    public loadingCtrl: LoadingController,
    public builder:FormBuilder,
    public actionSheetCtrl: ActionSheetController,public app:App) {
      this.editfrom = new FormGroup({
        subject: new FormControl('', [Validators.required]),
        body: new FormControl('',[Validators.required])
      });
  }

  ionViewDidLoad() {
    this.navdata = this.navParams.get('data');
  }

  closeModal() {
    this.view.dismiss();
  }

  SendMail(value:any){
    
  }

}
