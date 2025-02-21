import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { TraitBase, TraitInterface } from "../interfaces/trait.interface"
import { Component } from "@angular/core";
import { CardConfig } from "app/models/config.card.model";

@Component({
	templateUrl: './heighten.trait.component.html',
})
export class HeightenTrait extends TraitBase implements TraitInterface {
    static traitName = "heighten"

	override traitForm = new FormGroup({
		type: new FormControl(HeightenTrait.traitName),
		lines: new FormArray([
			new FormGroup({
				cost: new FormControl(''),
				effect: new FormControl(''),
			}),
		]),
	});

	override addFormArray(position: string) {
		(<FormArray>this.traitForm.get(position)).push(
			new FormGroup({
				cost: new FormControl(''),
				effect: new FormControl(''),
			})
		)
	}

	override render(ctx: CanvasRenderingContext2D, config: CardConfig, offset: number, draw: boolean = true) {
		super.render(ctx, config, offset, draw);
		
		this.traitForm.get('lines')?.value.forEach((heightened: any) => {
			
			offset = this.renderLine(ctx, config, offset, `Heightened (${heightened.cost})`, heightened.effect, draw);
		})

		offset += config.size.bodyFontSize;
		return offset;
	}
}