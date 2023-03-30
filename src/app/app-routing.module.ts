import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './app-auth/components/auth/auth.component';
import { QuizComponent } from './app-quiz/components/quiz/quiz.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
	{ path: '', component: QuizComponent, pathMatch: 'full', canActivate: [AuthGuard] },
	{ path: 'quiz', component: QuizComponent, canActivate: [AuthGuard] },
	{ path: 'auth', component: AuthComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
