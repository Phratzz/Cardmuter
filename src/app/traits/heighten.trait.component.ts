import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { TraitInterface } from "../interfaces/trait.interface"
import { Component } from "@angular/core";

@Component({
	templateUrl: './heighten.trait.component.html',
})
export class HeightenTrait implements TraitInterface {
    static traitName = "heighten"

	public traitForm = new FormGroup({
		type: new FormControl(HeightenTrait.traitName),
		lines: new FormArray([
			new FormGroup({
				cost: new FormControl(''),
				effect: new FormControl(''),
			}),
		]),
	});

	constructor() {}

    public formatForFormSubmit(): CardBodyHeighten {
        return new CardBodyHeighten(
			(this.traitForm.get('lines') as FormArray).value.map((value: {cost: string, effect: string}) => {
				return new CardBodyHeightenLine(
					value.cost,
					value.effect,
				)
			})
		)
    }

	public destroy() {}
	
	
	removeFormArray(position: string, index: number) {
		(<FormArray>this.traitForm.get(position)).removeAt(index)
	}
	getFormArray(position: string): FormArray {
		return this.traitForm.get(position) as FormArray
	}
	addFormArray(position: string) {
		(<FormArray>this.traitForm.get(position)).push(
			new FormGroup({
				cost: new FormControl(''),
				effect: new FormControl(''),
			})
		)
	}
}

export class CardBodyHeighten {
    constructor(
		public heightened: Array<CardBodyHeightenLine>,
    ) {}
}
export class CardBodyHeightenLine {
    constructor(
		public name: string,
		public value: string,
    ) {}
}