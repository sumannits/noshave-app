import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreviousContributionPage } from './previous-contribution';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    PreviousContributionPage,
  ],
  imports: [
    IonicPageModule.forChild(PreviousContributionPage),
    ComponentsModule
  ],
})
export class PreviousContributionPageModule {}
