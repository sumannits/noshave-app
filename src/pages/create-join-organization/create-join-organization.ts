import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ViewController ,ToastController } from 'ionic-angular';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Api } from '../../providers';

/**
 * Generated class for the CreateJoinOrganizationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-join-organization',
  templateUrl: 'create-join-organization.html',
})
export class CreateJoinOrganizationPage {
  public navdata : any;
  public response :any;
  public responsejoin : any;
  public createteam:FormGroup;
  public jointeam:FormGroup;
  public search_term : any;
  public teamresult : any;
  public teamarray:any;
  public teamresultnew:any;
  public teamdetailsByIdresult:any; 
  constructor(public authService:Api,public toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams,public view: ViewController) {
    this.createteam = new FormGroup({
      team_name: new FormControl('', [Validators.required]),
      team_username: new FormControl('', [Validators.required])
    });

    this.jointeam = new FormGroup({
      team: new FormControl('', [Validators.required])
    });

    let teamlist = new FormData();
    teamlist.append('search_term','');
    teamlist.append('type','search_org');
    this.authService.postData(teamlist,'search_orgs.php').then((results) => {
      this.teamresult = results;
      //console.log(this.teamresult);
      if(this.teamresult.status == 'success'){
        this.teamarray = this.teamresult.org_list;
        //console.log('teamarray',this.teamarray);
      } else {
        this.tost_message(this.teamresult.reason);
      }
    });
  }

  ionViewDidLoad() {
  }

  ionViewWillLoad() {
    this.navdata = this.navParams.get('data');
    console.log(this.navdata);
  }

  closeModal() {
    this.view.dismiss();
  }

  JoinTeam(value:any){
    if(this.jointeam.valid){
      const loguser = JSON.parse(localStorage.getItem('userData'));
      let jointeamfrom = new FormData();
      jointeamfrom.append('user_id',loguser.m_id);
      jointeamfrom.append('o_id',value.team);
      this.authService.postData(jointeamfrom,'join_org.php').then((result) => {
        this.responsejoin = result;
        if(this.responsejoin.status == 'success'){
          this.tost_message('Join to Organization Successfull.');
          this.navCtrl.setRoot('OrganizationPage');
        } else {
          this.tost_message(this.responsejoin.reason);
        }
      });
    } else {
      this.tost_message('Invalid Fromdata.');
    }
  }

  CreateTeam(value:any){
    if(this.createteam.valid){
      const loguser = JSON.parse(localStorage.getItem('userData'));
      let createteamfrom = new FormData();
      createteamfrom.append('user_id',loguser.m_id);
      createteamfrom.append('o_name',value.team_name);
      createteamfrom.append('o_username',value.team_username);
      this.authService.postData(createteamfrom,'create_org.php').then((resultdetail) => {
        this.response = resultdetail;
        if(this.response.status == 'success'){
          this.tost_message('Organization Created Successfully.');
          this.navCtrl.setRoot('OrganizationPage');
        } else {
          this.tost_message(this.response.reason);
        }
      });
    } else {
      this.tost_message('Invalid Fromdata.');
    }
  }
  onChange(event){
    let teamlistnew = new FormData();
    teamlistnew.append('search_term',this.search_term);
    teamlistnew.append('type','search_org');
    this.authService.postData(teamlistnew,'search_orgs.php').then((results) => {
      this.teamresultnew = results;
      if(this.teamresultnew.status == 'success'){
        this.teamarray = this.teamresultnew.org_list;
      } else {
        this.tost_message(this.teamresultnew.reason);
      }
    });
  }

  tost_message(msg){
    let toast = this.toastCtrl.create({
     message: msg,
     duration: 3000
   });
   toast.present(); 
  }

}
