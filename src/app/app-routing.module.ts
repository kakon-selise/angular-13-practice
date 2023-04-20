import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './app-auth/components/auth/auth.component';
import { AllQuestionsComponent } from './app-question-list/components/all-questions/all-questions.component';
import { EditQuestionComponent } from './app-quiz/components/my-questions/edit-question/edit-question.component';
import { MyQuestionsComponent } from './app-quiz/components/my-questions/my-questions.component';
import { QuizComponent } from './app-quiz/components/quiz/quiz.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
	{ path: '', component: QuizComponent, pathMatch: 'full', canActivate: [AuthGuard] },
	{ path: 'quiz', component: QuizComponent, canActivate: [AuthGuard] },
	{ path: 'auth', component: AuthComponent },
	{ path: 'get-questions', component: AllQuestionsComponent, canActivate: [AuthGuard] },
	{ path: 'myQuestions', component: MyQuestionsComponent, canActivate: [AuthGuard] },
	{ path: 'myQuestions/:id', component: EditQuestionComponent, canActivate: [AuthGuard] },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
