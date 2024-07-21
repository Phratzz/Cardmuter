import { FormBuilder, FormGroup } from "@angular/forms";
import { TraitInterface } from "../interfaces/trait.interface"

export class FluffTrait implements TraitInterface {
    public traitName = "fluff"

	constructor(
		private fb: FormBuilder,
	) {}

    public getFormGroup(): FormGroup {
        return this.fb.group({
            type: this.fb.control(this.traitName),
            text: this.fb.control(''),
        })
    }

    public formatForFormSubmit(item: any): CardBodyFluff {
        return new CardBodyFluff(item.text)
    }
}

export class CardBodyFluff {
    text: string[];

    constructor(
        ...text: string[]
    ) {
        this.text = text;
    }
}