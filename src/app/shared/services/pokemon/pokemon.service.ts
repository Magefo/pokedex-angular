import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pokemon } from '../../models/pokemon';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

const pokemonListUrl = 'https://pokeapi.co/api/v2/pokemon';
const limit = 20;

@Injectable({
	providedIn: 'root'
})
export class PokemonService {

	public selectedPokemon: Pokemon;

	constructor(private http: HttpClient) { }

	public getPokemonList(): Observable<Pokemon[]> {
		return this.http.get<Pokemon[]>(`${pokemonListUrl}?limit=${limit}`).pipe(
			map((data: any) => data.results),
			catchError(error => this.handleError(error, []))
		);
	}

	public getPokemonByName(url: string): Observable<Pokemon> {
		return this.http.get<Pokemon>(`${url}`).pipe(
			catchError(error => this.handleError(error, new Pokemon()))
		);
	}

	private handleError(error: any, returnObj: any) {
		console.log(error);
		alert('Error fetching data');
		return of(returnObj);
	}

}
