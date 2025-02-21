import { FormControl, FormGroup } from "@angular/forms";
import { TraitInterface } from "../interfaces/trait.interface"
import { Component } from "@angular/core";

@Component({
	templateUrl: './checkbox.trait.component.html',
})
export class CheckboxTrait implements TraitInterface {
    static traitName = "checkbox"

	public traitForm = new FormGroup({
		type: new FormControl(CheckboxTrait.traitName),
		text: new FormControl(''),
	});

	constructor() {}

    public formatForFormSubmit(): CardBodyCheckbox {
        return new CardBodyCheckbox(
            (this.traitForm.get('text')?.value) as string
		)
    }

	public destroy() {}
}

export class CardBodyCheckbox {
    constructor(
        public text: string
    ) {}
}