import { TraitInterface } from "../interfaces/trait.interface"
import { Component } from "@angular/core";
import { AdvancedTrait } from "./advanced.trait.component";
import { CardConfig } from "app/models/config.card.model";

@Component({
	templateUrl: './action.trait.component.html',
})
export class ActionTrait extends AdvancedTrait implements TraitInterface {
    static override traitName = "action"

	override traitOrder: string[] = [
		'activate',
	]

	override postRender(ctx: CanvasRenderingContext2D, config: CardConfig, offset: number, draw?: boolean): number | void {
		return offset -= config.size.bodyFontSize
	}
}