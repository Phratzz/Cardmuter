import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { AppRoutingModule } from './app-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { PF2SidebarComponent } from './pages/sidebar/pf2.component';
import { MaterialImportModule } from './app.material.modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlockRowComponent } from './building-blocks/block-row';
import { BlockFlowComponent } from './building-blocks/block-flow';
import { PF2AltSidebarComponent } from './pages/sidebar/pf2-alt.component';
import { TextTrait } from './traits/text.trait.component';

@NgModule({
	declarations: [
		AppComponent,
		CanvasComponent,
		IndexComponent,
		
		PF2SidebarComponent,
		PF2AltSidebarComponent,

		TextTrait,

		BlockFlowComponent,
		BlockRowComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		MaterialImportModule,
		FormsModule,
		ReactiveFormsModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
