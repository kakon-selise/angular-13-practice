import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PlayingRoutingModule {
	delta = 'name';

	showNav() {
		console.log('nav');
	}
}
