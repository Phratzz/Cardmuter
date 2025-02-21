import { FormControl, FormGroup } from "@angular/forms";
import { TraitInterface } from "../interfaces/trait.interface"
import { Component } from "@angular/core";

@Component({
	templateUrl: './fluff.trait.component.html',
})
export class FluffTrait implements TraitInterface {
    static traitName = "fluff"
	
	public traitForm = new FormGroup({
		type: new FormControl(FluffTrait.traitName),
		text: new FormControl(''),
	});

	constructor() {}

    public formatForFormSubmit(): CardBodyFluff {
        return new CardBodyFluff(
            (this.traitForm.get('text')?.value) as string
		)
    }

	public destroy() {}
}

export class CardBodyFluff {
    text: string[];

    constructor(
        ...text: string[]
    ) {
        this.text = text;
    }
}