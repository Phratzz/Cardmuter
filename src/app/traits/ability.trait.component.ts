import { FormControl, FormGroup } from "@angular/forms";
import { TraitInterface } from "../interfaces/trait.interface"
import { Component } from "@angular/core";

@Component({
	templateUrl: './ability.trait.component.html',
})
export class AbilityTrait implements TraitInterface {
    static traitName = "ability"

	public traitForm = new FormGroup({
		type: new FormControl(AbilityTrait.traitName),
		activate: new FormControl(''),
		activateAction: new FormControl(''),
		effect: new FormControl(''),
		frequency: new FormControl(''),
		requirement: new FormControl(''),
		trigger: new FormControl(''),
	});

	constructor() {}

    public formatForFormSubmit(): CardBodyAbility {
        return new CardBodyAbility(
			(this.traitForm.get('activate')?.value) as string,
			(this.traitForm.get('activateAction')?.value) as string,
			(this.traitForm.get('effect')?.value) as string,
			(this.traitForm.get('frequency')?.value) as string,
			(this.traitForm.get('requirement')?.value) as string,
			(this.traitForm.get('trigger')?.value) as string,
		)
    }

	public destroy() {}
}

export class CardBodyAbility {
    constructor(
		public activate: string,
		public activateAction: string,
		public effect: string | string[],
		public frequency: string,
		public requirement: string,
		public trigger: string,
    ) {}
}