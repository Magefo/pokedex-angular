import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class GameService {

	public player1: string;
	public player2: string;

	constructor() {
		console.log('initialized game service');
	}

	public resetPlayers() {
		this.player1 = null;
		this.player2 = null;
	}
}
