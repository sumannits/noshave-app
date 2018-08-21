import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalViewPage } from './personal-view';

@NgModule({
  declarations: [
    PersonalViewPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalViewPage),
  ],
})
export class PersonalViewPageModule {}
