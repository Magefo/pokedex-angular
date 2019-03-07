import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { GamePageComponent } from './game-page/game-page.component';
import { GameService } from './services/game.service';

@NgModule({
	declarations: [
		GamePageComponent
	],
	imports: [
		CommonModule,
		GameRoutingModule
	],
	providers: [
		GameService
	]
})
export class GameModule { }
