import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'block-row',
	template: '<ng-content></ng-content>',
    styles: [`:host {
        display: flex;
        flex-direction: row;
    
        grid-gap: var(--spacing);
    }`]
        
})
export class BlockRowComponent {

	constructor() { }

}
