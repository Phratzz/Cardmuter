import { FormGroup } from "@angular/forms"

export interface TraitInterface { 
    getFormGroup?: () => FormGroup
    formatForFormSubmit?: (item: any) => any
} 