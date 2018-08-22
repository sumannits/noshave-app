import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmailTeamPage } from './email-team';

@NgModule({
  declarations: [
    EmailTeamPage,
  ],
  imports: [
    IonicPageModule.forChild(EmailTeamPage),
  ],
})
export class EmailTeamPageModule {}
