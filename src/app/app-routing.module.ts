import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppAngularFlexLayoutComponent } from './app-angular-flex-layout/app-angular-flex-layout.component';
import { AppDataTableComponent } from './app-data-table/app-data-table.component';
import { AppHomePageComponent } from './app-home-page/app-home-page.component';

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
		path: 'angular-flex-layout',
		component: AppAngularFlexLayoutComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
