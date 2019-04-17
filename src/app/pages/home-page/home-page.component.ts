import { Component, OnInit, HostListener } from '@angular/core';
import { PokemonService } from 'src/app/shared/services/pokemon/pokemon.service';
import { Pokemon } from 'src/app/shared/models/pokemon';
import { GameService } from 'src/app/game/services/game.service';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { trigger, style, transition, animate } from '@angular/animations';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss'],
	animations: [
		trigger('listTrigger', [
			transition(':enter', [
				style({ opacity: 0 }),
				animate('1s', style({ opacity: 1 }))
			]),
			transition(':leave', [
				animate('1s', style({ opacity: 0 }))
			])
		]),
		trigger('footerTrigger', [
			transition(':leave', [
				style({ bottom: 0 }),
				animate('300ms ease-in', style({ bottom: -100 }))
			])
		]),
	],
})
export class HomePageComponent implements OnInit {

	public pokemons: Pokemon[] = [];
	public showFooter = true;

	get player1() { return this.gameService.player1; }
	get player2() { return this.gameService.player2; }

	constructor(
		private router: Router,
		private pokemonService: PokemonService,
		private gameService: GameService
	) { }

	ngOnInit() {
		this.gameService.resetPlayers();
		this.pokemonService.getPokemonList().subscribe((pokemons: Pokemon[]) => {
			this.pokemons = pokemons;
			setTimeout(_ => document.dispatchEvent(new CustomEvent('scroll')), 1000);
		});
	}

	@HostListener('document:scroll', ['$event'])
	public onWindowScroll(event) {
		const pos = event.srcElement.scrollingElement.clientHeight + event.srcElement.scrollingElement.scrollTop;
		const max = event.srcElement.scrollingElement.offsetHeight;
		if (pos >= max) {
			const offset = this.pokemons.length;
			this.pokemonService.getPokemonList(offset).subscribe((pokemons: Pokemon[]) => {
				pokemons.forEach(pokemon => this.pokemons.push(pokemon));
			});
		}
	}

	public selectPokemon(pokemon: Pokemon) {
		if (isNullOrUndefined(this.gameService.player1)) {
			this.gameService.player1 = pokemon;
		} else {
			of(pokemon).pipe(
				tap(p =>  this.gameService.player2 = p),
				delay(2000),
				tap(_ => this.showFooter = false),
				delay(300),
				tap(_ => this.router.navigateByUrl('game'))
			).subscribe();
		}
	}
}
