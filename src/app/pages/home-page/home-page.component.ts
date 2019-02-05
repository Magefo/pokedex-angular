import { Component, OnInit, HostListener } from '@angular/core';
import { PokemonService } from 'src/app/shared/services/pokemon/pokemon.service';
import { Pokemon } from 'src/app/shared/models/pokemon';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

	public pokemons: Pokemon[] = [];

	constructor(private pokemonService: PokemonService) { }

	ngOnInit() {
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

}
