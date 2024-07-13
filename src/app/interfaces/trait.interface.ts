import { FormGroup } from "@angular/forms"

export interface TraitInterface { 
    traitName: string

    addFormArray?: (position: string, cardform: FormGroup) => void
    formatForFormSubmit?: (item: any) => any
} 