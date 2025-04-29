import { FormControl, FormGroup } from "@angular/forms";
import { TraitBase, TraitInterface } from "../interfaces/trait.interface"
import { Component } from "@angular/core";
import { CardConfig } from "app/models/config.card.model";

@Component({
	templateUrl: './hunting.trait.component.html',
})
export class HuntingTrait extends TraitBase implements TraitInterface {
    static traitName = "hunting"

	override traitForm = new FormGroup({
		type: new FormControl(HuntingTrait.traitName),
		crit_success: new FormGroup({
			text: new FormControl(''),
			basic: new FormControl(''),
			special: new FormControl(''),
		}),
		success: new FormGroup({
			text: new FormControl(''),
			basic: new FormControl(''),
			special: new FormControl(''),
		}),
		failure: new FormGroup({
			text: new FormControl(''),
			basic: new FormControl(''),
			special: new FormControl(''),
		}),
		crit_failure: new FormGroup({
			text: new FormControl(''),
			basic: new FormControl(''),
			special: new FormControl(''),
		}),
	});

	override render(ctx: CanvasRenderingContext2D, config: CardConfig, offset: number, draw: boolean = true) {
		const bodyFont = 'GoodPro';
		const bodyFontBold = 'GoodPro-Bold';
		const bodyFontAlign = 'center';
		ctx.textAlign = bodyFontAlign;

		const order = [
			{key: 'cost', text: 'Cost'},
			{key: 'crit_success', text: 'Critical Success'},
			{key: 'success', text: 'Success'},
			{key: 'failure', text: 'Failure'},
			{key: 'crit_failure', text: 'Critical Failure'},
		]

		order.forEach((item) => {
			const value = this.traitForm.get(item.key)?.value;
			if(!value) { return; }

			// If entire section is empty, skip
			if(value.text == "" && value.basic == "" && value.special == "") { return; }

			// Title of the section, centering
			ctx.font = `${config.size.bodyFontSize}px ${bodyFontBold}`;

			offset = this.drawText(
				ctx,
				config,
				item.text,
				offset,
				0,
				0,
				draw,
				true,
			)

			// reset text
			ctx.font = `${config.size.bodyFontSize}px ${bodyFont}`;

			// if both are present, draw them next to each other
			if(value.basic != "") {
				offset = this.drawText(
					ctx,
					config,
					value.basic + " Basic Ingredients",
					offset,
					0,
					0,
					draw,
					true,
				)
			}

			if(value.special != "") {
				offset = this.drawText(
					ctx,
					config,
					value.special + " Special Ingredients",
					offset,
					0,
					0,
					draw,
					true,
				)
			}

			if(value.text != "") {
				offset = this.drawText(
					ctx,
					config,
					value.text,
					offset,
					0,
					0,
					draw,
					true,
				)
			}

			offset += config.size.bodyFontSize;
		})

		return offset
	}
}