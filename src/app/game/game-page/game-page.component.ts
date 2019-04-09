import { Component, OnInit } from '@angular/core';
import { Stage, Bitmap, Graphics, Container, Shape, Text } from '@createjs/easeljs';
import { Ticker, Tween } from '@createjs/tweenjs';
import { GameService } from '../services/game.service';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

const PLAYER1_ID = 'player1';
const PLAYER2_ID = 'player2';

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
		Ticker.addEventListener('tick', event => {
			this.stage.update();
		});

		this.preload();
	}

	private preload() {
		this.queue = new createjs.LoadQueue();
		this.queue.on('complete', this.initGame, this);
		this.queue.loadManifest([
			{ id: 'background', src: '/assets/sprites/battle-background.png' },
			{ id: PLAYER1_ID, src: this.gameService.player1.data.sprites.back_default },
			{ id: PLAYER2_ID, src: this.gameService.player2.data.sprites.front_default },
		]);

		this.gameService.player1.playerId = PLAYER1_ID;
		this.gameService.player2.playerId = PLAYER2_ID;
	}

	private initGame() {
		const background = new Bitmap(this.queue.getResult('background'));
		background.x = background.y = 0;

		const player1 = this.createPlayer(200, 330, 5, PLAYER1_ID);
		const player2 = this.createPlayer(800, 100, 3, PLAYER2_ID);

		this.stage.addChild(background);
		this.stage.addChild(player1);
		this.stage.addChild(player2);

		this.initialAnimation(background, player1, player2);
	}

	private createPlayer(x: number, y: number, scale: number, playerId: string): Container {
		const playerContainer = new Container();
		playerContainer.x = x + 1280;
		playerContainer.y = y;
		playerContainer.anim = {x, y};
		const playerBitmap = this.createPlayerBitmap(scale, playerId);
		const playerHeader = this.createPlayerHeader(playerId);
		playerContainer.addChild(playerBitmap, playerHeader);
		return playerContainer;
	}

	private createPlayerBitmap(scale: number, playerId: string): Bitmap {
		const player = new Bitmap(this.queue.getResult(playerId));
		player.x = player.y = 0;
		player.scaleX = player.scaleY = scale;
		return player;
	}

	private createPlayerHeader(playerId: string) {
		const player = (playerId === PLAYER1_ID) ? this.gameService.player1 : this.gameService.player2;
		const pos = (playerId === PLAYER1_ID) ? {x: 550, y: 150} : {x: -650, y: 50};
		const playerHeaderContainer = new Container();
		playerHeaderContainer.x = pos.x;
		playerHeaderContainer.y = pos.y;
		const nameText = new Text(player.name, '40px Arial', '#000000');
		nameText.x = 0;
		nameText.y = -50;

		const hitPoints = player.data.stats.find(s => s.stat.name === 'hp').base_stat;
		const hitPointsText = new Text(hitPoints + '/' + hitPoints, '30px Arial', '#000000');
		hitPointsText.x = 410;
		hitPointsText.y = 0;
		const playerHitPointsBar = this.createPlayerHitPointsBarShape();
		playerHeaderContainer.addChild(nameText, hitPointsText, playerHitPointsBar);
		return playerHeaderContainer;
	}

	private createPlayerHitPointsBarShape(): Shape {
		const barGraphic = new Graphics();
		barGraphic.setStrokeStyle(8, 'round')
			.beginStroke('#a5a5a5')
			.beginFill('#48b732')
			.drawRoundRect(0, 0, 400, 30, 10);
		const barShape = new Shape(barGraphic);
		barShape.x = barShape.y = 0;
		return barShape;
	}

	private initialAnimation(background: Bitmap, player1: Container, player2: Container) {
		Tween.get(player1).to({x: player1.anim.x, y: player1.anim.y}, 1000).call(_ => {
			Tween.get(player2).to({x: player2.anim.x, y: player2.anim.y}, 1000);
		});
	}
}
