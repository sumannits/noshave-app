import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupStep1Page } from './signup-step1';

@NgModule({
  declarations: [
    SignupStep1Page,
  ],
  imports: [
    IonicPageModule.forChild(SignupStep1Page),
  ],
})
export class SignupStep1PageModule {}
