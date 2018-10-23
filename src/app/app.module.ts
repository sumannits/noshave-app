import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
//import { AboutPage } from '../pages/about/about';
import { Api, ResponseMessage } from '../providers';
import { MyApp } from './app.component';
//import { SpeakerDetailPage } from '../pages/speaker-detail/speaker-detail';
//import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { AndroidPermissions} from '@ionic-native/android-permissions';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer';
import { ThemeableBrowser  } from '@ionic-native/themeable-browser';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
import { SocialSharing } from '@ionic-native/social-sharing';
import { Keyboard } from '@ionic-native/keyboard';
//import { SafariViewController } from '@ionic-native/safari-view-controller';
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
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    Api,
    ResponseMessage,
    SplashScreen,
    StatusBar,
    DatePicker,
    AndroidPermissions,
    FileTransfer,
    FilePath,
    File,
    Camera,
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ThemeableBrowser,
    SocialSharing,
    Keyboard,
    //SafariViewController
  ],
  exports:[
  ]
})
export class AppModule { }
