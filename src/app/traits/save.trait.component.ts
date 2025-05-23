import { TraitInterface } from "../interfaces/trait.interface"
import { Component } from "@angular/core";
import { AdvancedTrait } from "./advanced.trait.component";

@Component({
	templateUrl: './save.trait.component.html',
})
export class SaveTrait extends AdvancedTrait implements TraitInterface {
    static override traitName = "save"
	
	override traitOrder: string[] = [
		'crit_success',
		'success',
		'failure',
		'crit_failure',
	]
}