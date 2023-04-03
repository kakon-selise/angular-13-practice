import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuillModule } from 'ngx-quill';
import { AuthComponent } from './app-auth/components/auth/auth.component';
import { FooterComponent } from './app-layouts/footer/footer.component';
import { NavigationComponent } from './app-layouts/navigation/navigation.component';
import { QuestionComponent } from './app-quiz/components/question/question.component';
import { QuizComponent } from './app-quiz/components/quiz/quiz.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';
import { MaterialModule } from './shared/material/material.module';

// Import wiris generic plugin
import '@wiris/mathtype-generic/wirisplugin-generic';

@NgModule({
	declarations: [
		AppComponent,
		NavigationComponent,
		FooterComponent,
		LoadingSpinnerComponent,
		AuthComponent,
		QuestionComponent,
		QuizComponent,
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
		HttpClientModule,
		QuillModule
		
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {
	constructor() {}
}
