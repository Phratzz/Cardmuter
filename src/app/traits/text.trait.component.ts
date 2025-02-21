import { FormControl, FormGroup } from "@angular/forms";
import { TraitInterface } from "../interfaces/trait.interface"
import { Component } from "@angular/core";

@Component({
	templateUrl: './text.trait.component.html',
})
export class TextTrait implements TraitInterface {
    static traitName = "text"

	public traitForm = new FormGroup({
		type: new FormControl(TextTrait.traitName),
		text: new FormControl(''),
	});

	constructor() {}

    public formatForFormSubmit(): CardBodyText {
        return new CardBodyText(
            (this.traitForm.get('text')?.value) as string
		)
    }

	public destroy() {}
}

export class CardBodyText {
    text: string[];

    constructor(
        ...text: string[]
    ) {
        this.text = text;
    }
}