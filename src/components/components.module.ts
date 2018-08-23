import { NgModule } from '@angular/core';
import { DonateButtonComponent } from './donate-button/donate-button';
import { IonicPageModule } from 'ionic-angular';
@NgModule({
	declarations: [DonateButtonComponent],
	imports: [
		IonicPageModule.forChild(DonateButtonComponent),
	],
	exports: [DonateButtonComponent]
})
export class ComponentsModule {}
