import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'block-row',
	template: '<ng-content></ng-content>',
    styles: [`:host {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 1fr;
    
        grid-gap: var(--spacing);

        &:not(:first-child) {
            margin-top: var(--spacing);
        }

        ::ng-deep > [fill] {
            &[fill="2"] { grid-column: span 2; }
            &[fill="3"] { grid-column: span 3; }
            &[fill="4"] { grid-column: span 4; }
        }
    }`]
})
export class BlockRowComponent {

	constructor() { }

}
