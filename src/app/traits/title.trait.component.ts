import { FormControl, FormGroup } from "@angular/forms";
import { TraitInterface } from "../interfaces/trait.interface"
import { Component } from "@angular/core";

@Component({
	templateUrl: './title.trait.component.html',
})
export class TitleTrait implements TraitInterface {
    static traitName = "title"

	public traitForm = new FormGroup({
		type: new FormControl(TitleTrait.traitName),
		text: new FormControl(''),
	});

	constructor() {}

    public formatForFormSubmit(): CardBodyTitle {
        return new CardBodyTitle(
            (this.traitForm.get('text')?.value) as string
		)
    }

	public destroy() {}
}

export class CardBodyTitle {
    constructor(
        public text: string
    ) {}
}