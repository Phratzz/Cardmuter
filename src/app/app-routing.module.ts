import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PF2SidebarComponent } from './pages/sidebar/pf2.component';
import { PF2AltSidebarComponent } from './pages/sidebar/pf2-alt.component';

const routes: Routes = [
	{ path: '', redirectTo: '/pf2', pathMatch: 'full' },
	{ path: 'pf2', component: PF2SidebarComponent },
	{ path: 'pf2-alt', component: PF2AltSidebarComponent },
	{ path: 'swrpg', component: PF2SidebarComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }