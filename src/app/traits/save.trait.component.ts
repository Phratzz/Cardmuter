import { FormControl, FormGroup } from "@angular/forms";
import { TraitBase, TraitInterface } from "../interfaces/trait.interface"
import { Component } from "@angular/core";
import { CardConfig } from "app/models/config.card.model";

@Component({
	templateUrl: './save.trait.component.html',
})
export class SaveTrait extends TraitBase implements TraitInterface {
    static traitName = "save"

	override traitForm = new FormGroup({
		type: new FormControl(SaveTrait.traitName),
		crit_success: new FormControl(''),
		success: new FormControl(''),
		failure: new FormControl(''),
		crit_failure: new FormControl(''),
	});
		
	override render(ctx: CanvasRenderingContext2D, config: CardConfig, offset: number, draw: boolean = true) {
		super.render(ctx, config, offset, draw);

		const writingOrder = [
			'crit_success',
			'success',
			'failure',
			'crit_failure',
		]
		writingOrder.forEach((key) => {
			let value = this.traitForm.get(key)?.value;
			if(!value || (Array.isArray(value) && value.length === 0)) { return; }

			offset = this.renderLine(ctx, config, offset, key, value, draw);

			return offset + config.size.bodyFontSize;
		})

		offset += config.size.bodyFontSize;
		return offset;
	}
}