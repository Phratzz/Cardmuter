import { FormControl, FormGroup } from "@angular/forms";
import { TraitInterface } from "../interfaces/trait.interface"
import { Component } from "@angular/core";

@Component({
	templateUrl: './advanced.trait.component.html',
})
export class AdvancedTrait implements TraitInterface {
    static traitName = "advanced"

	public traitForm = new FormGroup({
		type: new FormControl(AdvancedTrait.traitName),
		activate: new FormControl(''),
		activateAction: new FormControl(''),
		effect: new FormControl(''),
		frequency: new FormControl(''),
		requirement: new FormControl(''),
		trigger: new FormControl(''),

		crit_success: new FormControl(''),
		success: new FormControl(''),
		failure: new FormControl(''),
		crit_failure: new FormControl(''),
	});

	constructor() {}

    public formatForFormSubmit(): CardBodyAdvanced {
        return new CardBodyAdvanced(
			(this.traitForm.get('activate')?.value) as string,
			(this.traitForm.get('activateAction')?.value) as string,
			(this.traitForm.get('effect')?.value) as string,
			(this.traitForm.get('frequency')?.value) as string,
			(this.traitForm.get('requirement')?.value) as string,
			(this.traitForm.get('trigger')?.value) as string,

			(this.traitForm.get('crit_success')?.value) as string,
			(this.traitForm.get('success')?.value) as string,
			(this.traitForm.get('failure')?.value) as string,
			(this.traitForm.get('crit_failure')?.value) as string,
		)
    }

	public destroy() {}
}

export class CardBodyAdvanced {
    constructor(
		public activate: string,
		public activateAction: string,
		public effect: string | string[],
		public frequency: string,
		public requirement: string,
		public trigger: string,
		
		public crit_success: string,
		public success: string,
		public failure: string,
		public crit_failure: string,
    ) {}
}