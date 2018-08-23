import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewTeamPage } from './view-team';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    ViewTeamPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewTeamPage),
    ComponentsModule
  ],
})
export class ViewTeamPageModule {}
