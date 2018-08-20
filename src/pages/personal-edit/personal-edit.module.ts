import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalEditPage } from './personal-edit';

@NgModule({
  declarations: [
    PersonalEditPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalEditPage),
  ],
})
export class PersonalEditPageModule {}
