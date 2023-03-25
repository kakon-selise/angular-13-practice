import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { CreateRecipeComponent } from './components/create-recipe/create-recipe.component';

const cookingRoutes: Routes = [
	{
		path: 'create-recipe',
		component: CreateRecipeComponent,
	},
];

@NgModule({
	declarations: [],
	imports: [CommonModule],
})
export class CookingModule {}
