import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
	declarations: [
		HomePageComponent,
		DetailPageComponent
	],
	imports: [
		CommonModule,
		SharedModule
	]
})
export class PagesModule { }
