import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DonationListPage } from './donation-list';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    DonationListPage,
  ],
  imports: [
    IonicPageModule.forChild(DonationListPage),
    ComponentsModule
  ],
})
export class DonationListPageModule {}
