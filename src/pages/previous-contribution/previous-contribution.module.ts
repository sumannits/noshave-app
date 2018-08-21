import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreviousContributionPage } from './previous-contribution';

@NgModule({
  declarations: [
    PreviousContributionPage,
  ],
  imports: [
    IonicPageModule.forChild(PreviousContributionPage),
  ],
})
export class PreviousContributionPageModule {}
