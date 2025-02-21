import { FormControl, FormGroup } from "@angular/forms";
import { TraitBase, TraitInterface } from "../interfaces/trait.interface"
import { Component } from "@angular/core";
import { CardConfig } from "app/models/config.card.model";

@Component({
	templateUrl: './text.trait.component.html',
})
export class TextTrait extends TraitBase implements TraitInterface {
    static traitName = "text"

	override traitForm = new FormGroup({
		type: new FormControl(TextTrait.traitName),
		text: new FormControl(''),
	});

	override render(ctx: CanvasRenderingContext2D, config: CardConfig, offset: number, draw: boolean = true) {
		super.render(ctx, config, offset, draw);

		const bodyFont = 'GoodPro';
		ctx.font = `${config.size.bodyFontSize}px ${bodyFont}`;

		offset = this.drawText(
			ctx,
			config,
			this.traitForm.get('text')?.value ?? '',
			offset,
			0,
			0,
			draw,
		)

		offset += config.size.bodyFontSize;
		return offset;
	}
}