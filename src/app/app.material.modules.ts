import {NgModule} from '@angular/core';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';

@NgModule({
	exports: [
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatSelectModule,
		MatChipsModule,
		MatIconModule,
		MatAutocompleteModule,
	]
})
export class MaterialImportModule {}