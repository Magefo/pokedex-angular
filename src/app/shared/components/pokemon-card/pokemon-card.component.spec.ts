import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonCardComponent } from './pokemon-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { pokemonListTest } from '../../models/pokemon-list-test';
import { pokemonTest } from '../../models/pokemon-test';
import { of } from 'rxjs';
import { PokemonService } from '../../services/pokemon/pokemon.service';

describe('PokemonCardComponent', () => {
	let component: PokemonCardComponent;
	let fixture: ComponentFixture<PokemonCardComponent>;

	const pokemonService = jasmine.createSpyObj('PokemonService', [
		'getPokemonList',
		'getPokemon'
	]);

	pokemonService.getPokemonList.and.returnValue(
		of(pokemonListTest)
	);

	pokemonService.getPokemon.and.returnValue(
		of(pokemonTest)
	);

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				PokemonCardComponent
			],
			imports: [
				RouterTestingModule
			],
			providers: [
				{ provide: PokemonService, useValue: pokemonService },
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PokemonCardComponent);
		component = fixture.componentInstance;
		component.pokemon = {
			name: 'bulbasaur',
			url: 'https://pokeapi.co/api/v2/pokemon/1/'
		};
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
