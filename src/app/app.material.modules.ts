import {NgModule} from '@angular/core';
import { MatButtonModule, MatCardModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule } from '@angular/material';

@NgModule({
	exports: [
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatSelectModule,
		MatChipsModule,
		MatIconModule,
	]
})
export class MaterialImportModule {}