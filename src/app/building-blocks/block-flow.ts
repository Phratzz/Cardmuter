import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'block-flow',
	template: '<ng-content></ng-content>',
    styles: [`:host {
        display: flex;
        flex-direction: column;
        grid-gap: var(--spacing);
    }`]
        
})
export class BlockFlowComponent {

	constructor() { }

}
