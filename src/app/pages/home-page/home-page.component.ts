import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/shared/services/pokemon/pokemon.service';
import { Pokemon } from 'src/app/shared/models/pokemon';

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
		});
	}

}
