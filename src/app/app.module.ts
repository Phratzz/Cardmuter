import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { AppRoutingModule } from './app-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { MaterialImportModule } from './app.material.modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlockRowComponent } from './building-blocks/block-row';
import { BlockFlowComponent } from './building-blocks/block-flow';

@NgModule({
	declarations: [
		AppComponent,
		CanvasComponent,
		IndexComponent,
		SidebarComponent,
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
