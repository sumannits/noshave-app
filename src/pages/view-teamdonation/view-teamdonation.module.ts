import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewTeamdonationPage } from './view-teamdonation';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    ViewTeamdonationPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewTeamdonationPage),
    ComponentsModule
  ],
})
export class ViewTeamdonationPageModule {}
