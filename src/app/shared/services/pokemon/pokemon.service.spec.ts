import { TestBed } from '@angular/core/testing';

import { PokemonService } from './pokemon.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { pokemonListTest } from '../../models/pokemon-list-test';
import { HttpRequest } from '@angular/common/http';
import { pokemonTest } from '../../models/pokemon-test';

describe('PokemonService', () => {
	let service: PokemonService;
	let httpController: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule
			]
		});
		service = TestBed.get(PokemonService);
		httpController = TestBed.get(HttpTestingController);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should get the pokemon list successfully', () => {
		const expectedResponse = {
			count: 964,
			next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
			previous: null,
			results: pokemonListTest
		};

		service.getPokemonList().subscribe((response: any) => {
			expect(response).toBeDefined();
			expect(response.length).toBe(20);
		});

		const httpCall = httpController.match((req: HttpRequest<any>) =>
			req.url === 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
		).pop();

		expect(httpCall).toBeDefined();
		expect(httpCall.request.method).toEqual('GET');

		httpCall.flush(expectedResponse);
		httpController.verify();
	});

	it('should get a pokemon successfully', () => {
		const url = 'https://pokeapi.co/api/v2/pokemon/1/';
		const expectedResponse = pokemonTest.data;

		service.getPokemon(url).subscribe((response: any) => {
			expect(response).toBeDefined();
			expect(response.id).toBe(1);
			expect(response.name).toBe('bulbasaur');
		});

		const httpCall = httpController.match((req: HttpRequest<any>) =>
			req.url === url
		).pop();

		expect(httpCall).toBeDefined();
		expect(httpCall.request.method).toEqual('GET');

		httpCall.flush(expectedResponse);
		httpController.verify();
	});
});
