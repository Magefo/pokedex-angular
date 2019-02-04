import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonService } from './services/pokemon/pokemon.service';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';

@NgModule({
	declarations: [
		PokemonCardComponent
	],
	imports: [
		CommonModule
	],
	exports: [
		PokemonCardComponent
	],
	providers: [
		PokemonService
	]
})
export class SharedModule { }
