import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pokemon } from '../../models/pokemon';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

const LIMIT = 20;
const POKEMONS_URL = 'https://pokeapi.co/api/v2/pokemon';

@Injectable({
	providedIn: 'root'
})
export class PokemonService {

	public selectedPokemon: Pokemon;

	constructor(private http: HttpClient) { }

	public getPokemonList(offset = 0): Observable<Pokemon[]> {
		const pokemonsUrl = `${POKEMONS_URL}?limit=${LIMIT}&offset=${offset}`;
		return this.http.get<Pokemon[]>(`${pokemonsUrl}`).pipe(
			map((data: any) => data.results),
			catchError(error => this.handleError(error, []))
		);
	}

	public getPokemon(url: string): Observable<Pokemon> {
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
