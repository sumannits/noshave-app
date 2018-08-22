import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalSharePage } from './personal-share';

@NgModule({
  declarations: [
    PersonalSharePage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalSharePage),
  ],
})
export class PersonalSharePageModule {}
