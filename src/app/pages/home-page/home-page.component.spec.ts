import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { of } from 'rxjs';
import { pokemonListTest } from 'src/app/shared/models/pokemon-list-test';
import { PokemonService } from 'src/app/shared/services/pokemon/pokemon.service';
import { RouterTestingModule } from '@angular/router/testing';
import { pokemonTest } from 'src/app/shared/models/pokemon-test';

describe('HomePageComponent', () => {
	let component: HomePageComponent;
	let fixture: ComponentFixture<HomePageComponent>;

	const pokemonService = jasmine.createSpyObj('PokemonService', [
		'getPokemonList',
		'getPokemon'
	]);

	pokemonService.getPokemonList.and.returnValue(
		of([])
	);

	pokemonService.getPokemon.and.returnValue(
		of(pokemonTest)
	);

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				HomePageComponent
			],
			imports: [
				RouterTestingModule,
				SharedModule
			],
			providers: [
				{ provide: PokemonService, useValue: pokemonService },
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HomePageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call getPokemonList if user scrolls bottom', () => {
		const event = {
			srcElement: {
				scrollingElement: {
					clientHeight: 200,
					scrollTop: 200,
					offsetHeight: 400
				}
			}
		};
		pokemonService.getPokemonList.calls.reset();
		component.onWindowScroll(event);
		expect(pokemonService.getPokemonList).toHaveBeenCalled();

		pokemonService.getPokemonList.calls.reset();
	});
});
