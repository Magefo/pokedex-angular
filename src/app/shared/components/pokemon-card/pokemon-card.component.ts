import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-pokemon-card',
	templateUrl: './pokemon-card.component.html',
	styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {

	@Input() pokemon: Pokemon;

	constructor(
		private router: Router,
		private pokemonService: PokemonService
	) { }

	ngOnInit() {
		this.pokemonService.getPokemonByName(this.pokemon.url).subscribe((data: any) => {
			this.pokemon.imgUrl = data.sprites.front_default;
			this.pokemon.data = data;
		})
	}

	public showDetail() {
		this.pokemonService.selectedPokemon = this.pokemon;
		this.router.navigateByUrl('pokemon');
	}

}
