import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FightFooterComponent } from './fight-footer.component';

describe('FightFooterComponent', () => {
	let component: FightFooterComponent;
	let fixture: ComponentFixture<FightFooterComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [FightFooterComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FightFooterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
