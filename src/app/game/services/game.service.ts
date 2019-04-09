import { Injectable } from '@angular/core';
import { Pokemon } from 'src/app/shared/models/pokemon';

@Injectable({
	providedIn: 'root'
})
export class GameService {

	public player1: Pokemon;
	public player2: Pokemon;

	constructor() {
		console.log('initialized game service');
	}

	public resetPlayers() {
		this.player1 = null;
		this.player2 = null;
	}
}
