import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { TraitInterface } from "../interfaces/trait.interface"
import { Component } from "@angular/core";

@Component({
	templateUrl: './staff.trait.component.html',
})
export class StaffTrait implements TraitInterface {
    static traitName = "staff"

	public traitForm = new FormGroup({
		type: new FormControl(StaffTrait.traitName),
		levels: new FormArray([
			new FormGroup({
				name: new FormControl(''),
				spells: new FormArray([
					new FormGroup({
						name: new FormControl(''),
						notes: new FormControl(''),
					}),
				]),
			}),
		]),
	});

	constructor() {}

    public formatForFormSubmit(): CardBodyStaff {
        return new CardBodyStaff(
			(this.traitForm.get('levels') as FormArray).value.map((value: CardBodyStaffLevel) => {
				return new CardBodyStaffLevel(
					value.name,
					value.spells.map((spell: CardBodyStaffLevelSpell) => {
						return new CardBodyStaffLevelSpell(
							spell.name,
							spell.notes,
						)
					})
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
	addFormArray(position: string, type: string) {
		switch (type) {
			case 'level':
				(<FormArray>this.traitForm.get(position)).push(
					new FormGroup({
						name: new FormControl(''),
						spells: new FormArray([
							new FormGroup({
								name: new FormControl(''),
								notes: new FormControl(''),
							}),
						]),
					})
				)
				break;
			case 'spell':
				(<FormArray>this.traitForm.get(position)).push(
					new FormGroup({
						name: new FormControl(''),
						notes: new FormControl(''),
					})
				)
				break;
		}
	}
}

export class CardBodyStaff {
    constructor(
		public staff: Array<CardBodyStaffLevel>,
    ) {}
}
export class CardBodyStaffLevel {
    constructor(
		public name: string,
		public spells: Array<CardBodyStaffLevelSpell>,
    ) {}
}
export class CardBodyStaffLevelSpell {
    constructor(
		public name: string,
		public notes: string,
    ) {}
}