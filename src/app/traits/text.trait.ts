import { FormArray, FormBuilder, FormGroup } from "@angular/forms"
import { TraitInterface } from "../interfaces/trait.interface"

export class TextTrait implements TraitInterface {
    public traitName = "text"

	constructor(
		private fb: FormBuilder,
	) {}

    public addFormArray(position: string, cardform: FormGroup): void {
        (<FormArray>cardform.get(position)).push(
            this.fb.group({
                type: this.fb.control(this.traitName),
                text: this.fb.control(''),
            }))
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