import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { SharedModule } from '../shared/shared.module';
import { FightFooterComponent } from './home-page/fight-footer/fight-footer.component';

@NgModule({
	declarations: [
		HomePageComponent,
		DetailPageComponent,
		FightFooterComponent
	],
	imports: [
		CommonModule,
		SharedModule
	]
})
export class PagesModule { }
