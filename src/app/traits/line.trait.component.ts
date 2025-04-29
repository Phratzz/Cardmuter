import { FormControl, FormGroup } from "@angular/forms";
import { TraitBase, TraitInterface } from "../interfaces/trait.interface"
import { Component } from "@angular/core";
import { CardConfig } from "app/models/config.card.model";

@Component({
	templateUrl: './line.trait.component.html',
})
export class LineTrait extends TraitBase implements TraitInterface {
    static traitName = "line"

	override traitForm = new FormGroup({
		type: new FormControl(LineTrait.traitName),
		checks: new FormControl(''),
	});

	override render(ctx: CanvasRenderingContext2D, config: CardConfig, offset: number, draw: boolean = true) {
		const lineColor = '#000';
		offset -= config.size.bodyFontSize - config.size.textMargin;

		ctx.beginPath();
		ctx.moveTo(config.size.textContainerOffset, offset);
		ctx.lineTo(config.size.width - config.size.textContainerOffset, offset);
		ctx.lineWidth = config.size.lineWidth;
		ctx.strokeStyle = lineColor;
		ctx.stroke();
		
		//offset += config.size.bodyFontSize;

		return offset + config.size.lineWidth + config.size.textMargin;
	}
}