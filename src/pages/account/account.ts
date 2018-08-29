import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController ,ToastController ,ActionSheetController,Platform} from 'ionic-angular';
import { AbstractControl,FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Api } from '../../providers';
import { Storage } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { FileTransfer , FileTransferObject } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
let apiUrl = 'http://192.168.1.68/noshave-new/platform/api/';
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  public response :any;
  public editfrom:FormGroup;
  public email:AbstractControl;
  public full_name:AbstractControl;
  public city:AbstractControl;
  public state:AbstractControl;
  public country:AbstractControl;
  public got_screened:AbstractControl;
  public profileimage:any;
  public new_image:any;
  public responseDataDetail:any;
  constructor(public toastCtrl:ToastController,
    public authService:Api,
    public loadingCtrl: LoadingController,
    public builder:FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    public actionSheetCtrl: ActionSheetController,
    public platform: Platform,
    public transfer: FileTransfer,
    public file: File,
    public filePath: FilePath,
    public camera: Camera) {
      let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
      this.editfrom = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
        full_name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
        city: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        got_screened: new FormControl(''),
      });
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad MyprofilePage');
    const loguser = JSON.parse(localStorage.getItem('userData'));
    this.getprofileById(loguser.m_id);
  }

  ngAfterViewInit() {

  }

  getprofileById(id){
    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
    let getuserDetail = new FormData();
    getuserDetail.append('user_id',id);
    getuserDetail.append('service_type','user_details');
    this.authService.postData(getuserDetail,'login.php').then((resultdetail) => {
      loading.dismiss();
      this.responseDataDetail = resultdetail;
      if(this.responseDataDetail.status == 'success'){
        this.editfrom.controls['full_name'].setValue(this.responseDataDetail.user_details.m_full_name);
        this.editfrom.controls['email'].setValue(this.responseDataDetail.user_details.m_email);
        this.editfrom.controls['city'].setValue(this.responseDataDetail.user_details.m_city);
        this.editfrom.controls['state'].setValue(this.responseDataDetail.user_details.m_state);
        this.editfrom.controls['country'].setValue(this.responseDataDetail.user_details.m_country);
        if(this.responseDataDetail.user_details.m_got_screen == 1){
          this.editfrom.controls['got_screened'].setValue(1);
        } else {
          this.editfrom.controls['got_screened'].setValue(0);
        }
        this.profileimage = this.responseDataDetail.user_details.m_profile_pic;
      } else {
        this.tost_message(this.responseDataDetail.reason);
      }
    });
  }

  EditFrom(value:any){
    let loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    loading.present();
    const loguser1 = JSON.parse(localStorage.getItem('userData'));
    let upuserDetail = new FormData();
    upuserDetail.append('user_id',loguser1.m_id);
    upuserDetail.append('m_full_name',value.full_name);
    upuserDetail.append('m_email',value.email);
    upuserDetail.append('m_city',value.city);
    upuserDetail.append('m_state',value.state);
    upuserDetail.append('m_country',value.country);
    upuserDetail.append('m_got_screen',value.got_screened);
    upuserDetail.append('service_type','update_account');
    this.authService.postData(upuserDetail,'user.php').then((result) => {
      loading.dismiss();
      this.responseDataDetail = result;
      if(this.responseDataDetail.status == 'success'){
        this.tost_message(this.responseDataDetail.msg);
      } else {
        this.tost_message(this.responseDataDetail.reason);
      }
    });
  }

  //Photo Upload Action
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      enableBackdropDismiss: true,
      buttons: [
        {
          text: 'Take a picture',
          icon: 'camera',
          handler: () => {
            this.uploadFromCamera(this.camera.PictureSourceType.CAMERA);
          }
        }, {
          text: 'From gallery',
          icon: 'images',
          handler: () => {
            this.uploadFromCamera(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        }
      ]
    });
    actionSheet.present();
  }

  //Camera and gallery Library Get image function
  uploadFromCamera(sourceType){
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName(currentName));
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName(currentName));
      }
    }, (err) => {
      this.tost_message('Error while selecting image.');
    });
  }

  //Create a file name
  public createFileName(currentName) {
    var newFileName = currentName;
    return newFileName;
  }

  //Copy file to local directory
  public copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.new_image = newFileName;
    }, error => {
      this.tost_message('Error while storing file.');
    });
  }

  //Get the path for image
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  //Upload image to server
  public uploadImage(id) {
    // Destination URL
    var url = apiUrl + 'webservice/users/app_upload_profileimg';
    // File for Upload
    var targetPath = this.pathForImage(this.new_image);
    // File name only
    var filename = this.new_image;
    var options = {
      fileKey: "image",
      image: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {
      'image':filename,
      'id':id
      }
    };
    const fileTransfer:FileTransferObject = this.transfer.create();
    fileTransfer.upload(targetPath, url, options).then(data => {
    }, err => {
      console.log("Error",err);
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
