import { FormControl, FormGroup } from "@angular/forms";
import { TraitBase, TraitInterface } from "../interfaces/trait.interface"
import { Component } from "@angular/core";
import { CardConfig } from "app/models/config.card.model";

@Component({
	templateUrl: './title.trait.component.html',
})
export class TitleTrait extends TraitBase implements TraitInterface {
    static traitName = "title"

	override traitForm = new FormGroup({
		type: new FormControl(TitleTrait.traitName),
		text: new FormControl(''),
	});

	override render(ctx: CanvasRenderingContext2D, config: CardConfig, offset: number, draw: boolean = true) {
		super.render(ctx, config, offset, draw);

		const bodyFont = 'GoodPro-CondBold';
		ctx.font = `${config.size.titleFontSize}px ${bodyFont}`;
		
		const bodyFontAlignCenter = 'center';
		ctx.textAlign = bodyFontAlignCenter;

		offset = this.drawText(
			ctx,
			config,
			this.traitForm.get('text')?.value?.toUpperCase() ?? '',
			offset,
			0,
			0,
			draw,
			true,
		)

		offset += config.size.bodyFontSize;
		return offset;
	}
}