import { FormControl, FormGroup } from "@angular/forms";
import { TraitInterface } from "../interfaces/trait.interface"
import { Component } from "@angular/core";

@Component({
	templateUrl: './save.trait.component.html',
})
export class SaveTrait implements TraitInterface {
    static traitName = "save"

	public traitForm = new FormGroup({
		type: new FormControl(SaveTrait.traitName),
		crit_success: new FormControl(''),
		success: new FormControl(''),
		failure: new FormControl(''),
		crit_failure: new FormControl(''),
	});

	constructor() {}

    public formatForFormSubmit(): CardBodySave {
        return new CardBodySave(
			(this.traitForm.get('crit_success')?.value) as string,
			(this.traitForm.get('success')?.value) as string,
			(this.traitForm.get('failure')?.value) as string,
			(this.traitForm.get('crit_failure')?.value) as string
		)
    }

	public destroy() {}
}

export class CardBodySave {
    constructor(
		public crit_success: string,
		public success: string,
		public failure: string,
		public crit_failure: string,
    ) {}
}