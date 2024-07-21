import { FormBuilder, FormGroup } from "@angular/forms";
import { TraitInterface } from "../interfaces/trait.interface"
import { Component } from "@angular/core";

@Component({
	templateUrl: './text.trait.component.html',
})
export class TextTrait implements TraitInterface {
    static traitName = "text"

	constructor(
		private fb: FormBuilder,
	) {}

    public getFormGroup(): FormGroup {
        return this.fb.group({
            type: this.fb.control(TextTrait.traitName),
            text: this.fb.control(''),
        })
    }

    public formatForFormSubmit(item: any): CardBodyText {
        return new CardBodyText(item.text)
    }
}

export class CardBodyText {
    text: string[];

    constructor(
        ...text: string[]
    ) {
        this.text = text;
    }
}