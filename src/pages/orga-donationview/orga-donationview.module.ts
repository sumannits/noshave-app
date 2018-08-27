import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrgaDonationviewPage } from './orga-donationview';

@NgModule({
  declarations: [
    OrgaDonationviewPage,
  ],
  imports: [
    IonicPageModule.forChild(OrgaDonationviewPage),
  ],
})
export class OrgaDonationviewPageModule {}
