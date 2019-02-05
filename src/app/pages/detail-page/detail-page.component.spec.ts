import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPageComponent } from './detail-page.component';
import { pokemonTest } from 'src/app/shared/models/pokemon-test';
import { PokemonService } from 'src/app/shared/services/pokemon/pokemon.service';

describe('DetailPageComponent', () => {
	let component: DetailPageComponent;
	let fixture: ComponentFixture<DetailPageComponent>;

	const pokemonService = jasmine.createSpyObj('PokemonService', [
		'getPokemonList',
		'getPokemon'
	]);

	pokemonService.selectedPokemon = pokemonTest;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				DetailPageComponent
			],
			providers: [
				{ provide: PokemonService, useValue: pokemonService },
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DetailPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
