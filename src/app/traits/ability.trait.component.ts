import { TraitInterface } from "../interfaces/trait.interface"
import { Component } from "@angular/core";
import { AdvancedTrait } from "./advanced.trait.component";

@Component({
	templateUrl: './ability.trait.component.html',
})
export class AbilityTrait extends AdvancedTrait implements TraitInterface {
    static override traitName = "ability"

	override traitOrder: string[] = [
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
}