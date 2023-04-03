import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppDataTableComponent } from './app-data-table/app-data-table.component';
import { AppHomePageComponent } from './app-home-page/app-home-page.component';
import { DeepStyleComponent } from './app-ng-host-ng-deep/components/deep-style/deep-style.component';
import { RegularStyleComponent } from './app-ng-host-ng-deep/components/regular-style/regular-style.component';

const routes: Routes = [
	{
		path: '',
		component: AppHomePageComponent,
		pathMatch: 'full',
	},
	{
		path: 'home',
		component: AppHomePageComponent,
		pathMatch: 'full',
	},
	{
		path: 'data-table',
		component: AppDataTableComponent,
	},
	{
		path:'regular-style',
		component: RegularStyleComponent
	},

	{
		path: 'deep-style',
		component: DeepStyleComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
