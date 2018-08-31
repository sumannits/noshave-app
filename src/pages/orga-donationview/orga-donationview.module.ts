import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrgaDonationviewPage } from './orga-donationview';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    OrgaDonationviewPage,
  ],
  imports: [
    IonicPageModule.forChild(OrgaDonationviewPage),
    ComponentsModule
  ],
})
export class OrgaDonationviewPageModule {}
