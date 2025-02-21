import { FormControl, FormGroup } from "@angular/forms";
import { TraitBase, TraitInterface } from "../interfaces/trait.interface"
import { Component } from "@angular/core";
import { CardConfig } from "app/models/config.card.model";

@Component({
	templateUrl: './checkbox.trait.component.html',
})
export class CheckboxTrait extends TraitBase implements TraitInterface {
    static traitName = "checkbox"

	override traitForm = new FormGroup({
		type: new FormControl(CheckboxTrait.traitName),
		checks: new FormControl(''),
	});

	override render(ctx: CanvasRenderingContext2D, config: CardConfig, offset: number, draw: boolean = true) {
		super.render(ctx, config, offset, draw);

		ctx.fillStyle = '#000';
		ctx.lineWidth = config.size.checkWidth;
		
		// figure out how many checks fit on a line
		const numberOfChecks = parseInt(this.traitForm.get('checks')?.value ?? '');
		const maxOnLine = Math.floor((config.size.width - config.size.textContainerOffset * 2 + config.size.checkMargin) / (config.size.checkSize + config.size.checkMargin));
		const linesNeeded = Math.ceil(numberOfChecks / maxOnLine);
		const checksOnLine = Math.floor(numberOfChecks / linesNeeded);
		let remainder = numberOfChecks % checksOnLine;

		// draw the checks
		for(let i = 0; i < linesNeeded; i++) {
			let checksToDraw = checksOnLine
			if(remainder > 0) {
				checksToDraw++;
				remainder--;
			}

			// draw check, centered
			let lineOffset = (config.size.width - config.size.textContainerOffset * 2 - checksToDraw * config.size.checkSize - (checksToDraw - 1) * config.size.checkMargin) / 2;
			for(let ii = 0; ii < checksToDraw; ii++) {
				if(draw) {
					ctx.strokeRect(
						config.size.textContainerOffset + lineOffset,
						offset,
						config.size.checkSize,
						config.size.checkSize,
					);
				}

				lineOffset += config.size.checkSize + config.size.checkMargin;
			}
			
			offset += config.size.checkSize + config.size.checkMargin;
		}

		offset -= config.size.checkMargin;
		offset += config.size.bodyFontSize;

		return offset
	}
}