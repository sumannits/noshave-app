import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrganizationPage } from './organization';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    OrganizationPage,
  ],
  imports: [
    IonicPageModule.forChild(OrganizationPage),
    ComponentsModule
  ],
})
export class OrganizationPageModule {}
