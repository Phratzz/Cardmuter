import { TraitInterface } from "../interfaces/trait.interface"
import { Component } from "@angular/core";
import { AdvancedTrait } from "./advanced.trait.component";

@Component({
	templateUrl: './action.trait.component.html',
})
export class ActionTrait extends AdvancedTrait implements TraitInterface {
    static override traitName = "action"

	override traitOrder: string[] = [
		'activate',
	]
}