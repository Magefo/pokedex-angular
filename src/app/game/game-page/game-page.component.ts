import { Component, OnInit } from '@angular/core';
import { Stage, Bitmap } from '@createjs/easeljs';
import { GameService } from '../services/game.service';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Component({
	selector: 'app-game-page',
	templateUrl: './game-page.component.html',
	styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent implements OnInit {
	private stage: Stage;
	private queue: createjs.LoadQueue;

	constructor(
		private router: Router,
		private gameService: GameService
	) { }

	ngOnInit() {
		if (isNullOrUndefined(this.gameService.player1) || isNullOrUndefined(this.gameService.player2)) {
			return this.router.navigateByUrl('/');
		}
		this.stage = new Stage('game-canvas');
		this.preload();
	}

	private preload() {
		this.queue = new createjs.LoadQueue();
		this.queue.on('complete', this.initGame, this);
		this.queue.loadManifest([
			{ id: 'background', src: '/assets/sprites/battle-background.png' },
			{ id: 'player1', src: this.gameService.player1 },
			{ id: 'player2', src: this.gameService.player2 },
		]);
	}

	private initGame() {
		const background = new Bitmap(this.queue.getResult('background'));
		background.x = background.y = 0;

		const player1 = this.createPlayerBitmap(430, 780, 5, 'player1');
		const player2 = this.createPlayerBitmap(950, 380, 3, 'player2');

		this.stage.addChild(background);
		this.stage.addChild(player1);
		this.stage.addChild(player2);
		this.stage.update();
	}

	private createPlayerBitmap(x: number, y: number, scale: number, image: string): Bitmap {
		const player = new Bitmap(this.queue.getResult(image));
		player.regX = 48;
		player.regY = 96;
		player.x = x;
		player.y = y;
		player.scaleX = player.scaleY = scale;
		return player;
	}
}
