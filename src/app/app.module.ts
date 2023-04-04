import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ArchivedComponent } from './app-cooking/components/archived/archived.component';
import { CreateRecipeComponent } from './app-cooking/components/create-recipe/create-recipe.component';
import { AppDataTableComponent } from './app-data-table/app-data-table.component';
import { AppHomePageComponent } from './app-home-page/app-home-page.component';
import { FooterComponent } from './app-layouts/footer/footer.component';
import { NavigationComponent } from './app-layouts/navigation/navigation.component';
import { DeepStyleComponent } from './app-ng-host-ng-deep/components/deep-style/deep-style.component';
import { RegularStyleComponent } from './app-ng-host-ng-deep/components/regular-style/regular-style.component';
import { UserInfoComponent } from './app-ng-template/components/user-info/user-info.component';
import { StartGameComponent } from './app-playing/components/start-game/start-game.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KknCardComponent } from './shared/components/kkn-card/kkn-card.component';
import { MaterialModule } from './shared/material/material.module';

@NgModule({
	declarations: [
		AppComponent,
		CreateRecipeComponent,
		ArchivedComponent,
		StartGameComponent,
		NavigationComponent,
		FooterComponent,
  AppDataTableComponent,
  AppHomePageComponent,
  RegularStyleComponent,
  DeepStyleComponent,
  KknCardComponent,
  UserInfoComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule,
		LayoutModule,
		MatToolbarModule,
		MatButtonModule,
		MatSidenavModule,
		MatIconModule,
		MatListModule,
		FlexLayoutModule,
		
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {
	constructor() {}
}
