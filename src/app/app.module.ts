import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { Stripe } from '@ionic-native/stripe';
//import { AboutPage } from '../pages/about/about';
import { Api, ResponseMessage } from '../providers';
import { MyApp } from './app.component';
import { UserData } from '../providers/user-data';
import { Broadcaster } from '../providers/eventEmitter';
import { InAppBrowser } from '@ionic-native/in-app-browser';
//import { SpeakerDetailPage } from '../pages/speaker-detail/speaker-detail';
//import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { AndroidPermissions} from '@ionic-native/android-permissions';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
import { Ionic2RatingModule } from 'ionic2-rating';
import { AppRate } from '@ionic-native/app-rate';
import { AccountPageModule } from '../pages/account/account.module';

const configFirebase = {
  apiKey: "AIzaSyDivtVgy4Gj_t7PymCTKR6bX7wSNyny6NM",
  authDomain: "base-32762.firebaseapp.com",
  databaseURL: "https://base-32762.firebaseio.com",
  projectId: "base-32762",
  storageBucket: "",
  messagingSenderId: "350229533440"
};

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(configFirebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot(),
    AccountPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    Api,
    ResponseMessage,
    Camera,
    SplashScreen,
    StatusBar,
    Broadcaster,
    GoogleMaps,
    Geolocation,
    Stripe,
    DatePicker,
    AndroidPermissions,
    Camera,
    FileTransfer,
    FilePath,
    File,
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserData,
    InAppBrowser,
    AppRate
  ]
})
export class AppModule { }
