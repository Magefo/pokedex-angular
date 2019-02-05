import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pokemon } from '../../models/pokemon';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

const limit = 20;

@Injectable({
	providedIn: 'root'
})
export class PokemonService {

	public selectedPokemon: Pokemon;
	private initialPokemonsUrl = 'https://pokeapi.co/api/v2/pokemon';
	private morePokemonsUrl: string;

	constructor(private http: HttpClient) { }

	public getPokemonList(): Observable<Pokemon[]> {
		const pokemonsUrl = isNullOrUndefined(this.morePokemonsUrl) ? `${this.initialPokemonsUrl}?limit=${limit}` : this.morePokemonsUrl;
		return this.http.get<Pokemon[]>(`${pokemonsUrl}`).pipe(
			tap((data: any) => this.morePokemonsUrl = data.next),
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
