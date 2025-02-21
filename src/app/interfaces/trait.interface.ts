import { FormGroup } from "@angular/forms"

export interface TraitInterface { 
    traitForm: FormGroup
    formatForFormSubmit?: () => any
	destroy: () => void
} 