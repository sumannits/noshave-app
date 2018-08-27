import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrgaMembersviewPage } from './orga-membersview';

@NgModule({
  declarations: [
    OrgaMembersviewPage,
  ],
  imports: [
    IonicPageModule.forChild(OrgaMembersviewPage),
  ],
})
export class OrgaMembersviewPageModule {}
