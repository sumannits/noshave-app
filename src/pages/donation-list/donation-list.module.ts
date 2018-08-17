import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DonationListPage } from './donation-list';

@NgModule({
  declarations: [
    DonationListPage,
  ],
  imports: [
    IonicPageModule.forChild(DonationListPage),
  ],
})
export class DonationListPageModule {}
