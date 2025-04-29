import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { TraitBase, TraitInterface } from "../interfaces/trait.interface"
import { Component } from "@angular/core";
import { CardConfig } from "app/models/config.card.model";

@Component({
	templateUrl: './staff.trait.component.html',
})
export class StaffTrait extends TraitBase implements TraitInterface {
    static traitName = "staff"

	override traitForm = new FormGroup({
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

	override addFormArray(position: string, type: string) {
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

	override render(ctx: CanvasRenderingContext2D, config: CardConfig, offset: number, draw: boolean = true) {
		this.traitForm.get('levels')?.value.forEach((level) => {
			const spelltext = level.spells.reduce((text, spell) => {
				if(text.length > 0) {
					text += ', '
				}

				text += `${spell.name}`
				if(spell.notes) {
					text += ` (${spell.notes})`
				}

				return text
			}, '')

			offset = this.renderLine(ctx, config, offset, level.name ?? '', spelltext, draw);
		})

		offset += config.size.bodyFontSize;
		return offset;
	}
}