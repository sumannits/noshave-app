import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewDonationPage } from './view-donation';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    ViewDonationPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewDonationPage),
    ComponentsModule
  ],
})
export class ViewDonationPageModule {}
