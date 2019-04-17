import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';

const routes: Routes = [
	{
		path: '',
		component: HomePageComponent,
		data: { animation: 'HomePage' }
	},
	{
		path: 'pokemon',
		component: DetailPageComponent,
		data: { animation: 'DetailPage' }
	},
	{
		path: 'game',
		loadChildren: './game/game.module#GameModule',
		data: { animation: 'GamePage' }
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
