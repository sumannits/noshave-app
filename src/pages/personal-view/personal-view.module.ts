import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalViewPage } from './personal-view';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    PersonalViewPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalViewPage),
    ComponentsModule
  ],
})
export class PersonalViewPageModule {}
