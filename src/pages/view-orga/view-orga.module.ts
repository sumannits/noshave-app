import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewOrgaPage } from './view-orga';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    ViewOrgaPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewOrgaPage),
    ComponentsModule
  ],
})
export class ViewOrgaPageModule {}
