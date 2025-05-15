import { FormControl, FormGroup } from "@angular/forms";
import { TraitBase, TraitInterface } from "../interfaces/trait.interface"
import { Component } from "@angular/core";
import { CardConfig } from "app/models/config.card.model";

@Component({
	templateUrl: './advanced.trait.component.html',
})
export class AdvancedTrait extends TraitBase implements TraitInterface {
    static traitName = "advanced"

	override traitForm = new FormGroup({
		type: new FormControl(AdvancedTrait.traitName),
		name: new FormControl(''),
		
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
	})

	public traitOrder = [
		'activate',
		'trigger',
		'requirement',
		'frequency',
		'effect',

		'crit_success',
		'success',
		'failure',
		'crit_failure',
	]
	
	override render(ctx: CanvasRenderingContext2D, config: CardConfig, offset: number, draw: boolean = true) {
		this.traitOrder.forEach((key) => {
			let value = this.traitForm.get(key)?.value;
			
			if(key != 'activate' || !this.traitForm.get('activateAction')?.value) {
				if(!value || (Array.isArray(value) && value.length === 0)) { return; }
			}

			offset = this.renderLine(ctx, config, offset, key, value, draw);

			return offset + config.size.bodyFontSize;
		})

		offset += config.size.bodyFontSize;
		return offset;
	}
}