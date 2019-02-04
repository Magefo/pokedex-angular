import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/shared/services/pokemon/pokemon.service';
import { Pokemon } from 'src/app/shared/models/pokemon';

@Component({
	selector: 'app-detail-page',
	templateUrl: './detail-page.component.html',
	styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {

	public pokemon: Pokemon;

	constructor(private pokemonService: PokemonService) { }

	ngOnInit() {
		this.pokemon = this.pokemonService.selectedPokemon;
	}

}
