import { trigger, animateChild, group, transition, animate, style, query, animation, useAnimation } from '@angular/animations';

const horizontalAnimation = animation([
	style({ position: 'relative' }),
	query(':enter, :leave', [
		style({
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%'
		})
	]),
	query(':enter', [
		style({ left: '{{ start }}' })
	]),
	group([
		query(':leave', [
			animate('{{ duration }} {{ curve }}', style({ left: '{{ end }}' }))
		]),
		query(':enter', [
			animate('{{ duration }} {{ curve }}', style({ left: '0%' }))
		])
	]),
	query(':enter', animateChild()),
]);

export const slideInAnimation = trigger('routeAnimations', [
	// HomePage <=> DetailPage
	transition('HomePage => DetailPage', [
		useAnimation(horizontalAnimation, {
			params: { start: '100%', end: '-100%', duration: '600ms', curve: 'ease-out' }
		})
	]),
	transition('DetailPage => HomePage', [
		useAnimation(horizontalAnimation, {
			params: { start: '-100%', end: '100%', duration: '600ms', curve: 'ease-out' }
		})
	]),

	// HomePage <=> GamePage
	transition('HomePage => GamePage', [
		useAnimation(horizontalAnimation, {
			params: { start: '100%', end: '-100%', duration: '600ms', curve: 'ease-out' }
		})
	]),
	transition('GamePage => HomePage', [
		useAnimation(horizontalAnimation, {
			params: { start: '-100%', end: '100%', duration: '600ms', curve: 'ease-out' }
		})
	])
]);
