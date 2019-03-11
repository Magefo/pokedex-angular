import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
	@Output() onSelectPokemon = new EventEmitter<Pokemon>();

	constructor(
		private router: Router,
		private pokemonService: PokemonService
	) { }

	ngOnInit() {
		this.pokemonService.getPokemon(this.pokemon.url).subscribe((data: any) => {
			this.pokemon.imgUrl = data.sprites.front_default;
			this.pokemon.data = data;
		});
	}

	public select() {
		this.onSelectPokemon.emit(this.pokemon);
	}

	public showDetail() {
		this.pokemonService.selectedPokemon = this.pokemon;
		this.router.navigateByUrl('pokemon');
	}

}
