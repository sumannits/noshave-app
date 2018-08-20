import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AfterSkipPage } from './after-skip';

@NgModule({
  declarations: [
    AfterSkipPage,
  ],
  imports: [
    IonicPageModule.forChild(AfterSkipPage),
  ],
})
export class AfterSkipPageModule {}
