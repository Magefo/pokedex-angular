import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from 'src/app/shared/models/pokemon';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
	selector: 'app-fight-footer',
	templateUrl: './fight-footer.component.html',
	styleUrls: ['./fight-footer.component.scss'],
	animations: [
		trigger('player1Transition', [
			transition(':enter', [
				style({ left: -1000 }),
				animate('800ms ease-out', style({ left: 0 })),
			])
		]),
		trigger('player2Transition', [
			transition(':enter', [
				style({ right: -1000 }),
				animate('800ms ease-out', style({ right: 0 })),
			])
		]),
	],
})
export class FightFooterComponent implements OnInit {

	@Input() player1: Pokemon;
	@Input() player2: Pokemon;

	constructor() { }

	ngOnInit() {
	}

	public getPokemonImage(pokemon: Pokemon) {
		return { 'background-image': 'url(' + pokemon.imgUrl + ')'};
	}

}
