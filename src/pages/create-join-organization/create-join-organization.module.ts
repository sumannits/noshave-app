import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateJoinOrganizationPage } from './create-join-organization';

@NgModule({
  declarations: [
    CreateJoinOrganizationPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateJoinOrganizationPage),
  ],
})
export class CreateJoinOrganizationPageModule {}
