import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileReviewPage } from './profile-review';

@NgModule({
  declarations: [
    ProfileReviewPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileReviewPage),
  ],
})
export class ProfileReviewPageModule {}
