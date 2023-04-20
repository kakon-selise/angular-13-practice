import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../models/question.model';

@Injectable({
	providedIn: 'root',
})
export class QuizService {
	BASE_URL = `http://input.quizhero.easymemo.net/api/v1/`;

	constructor(private http: HttpClient) {}

	postQuestion(question: any) {
		const url = `${this.BASE_URL}questions`;
		question.options.forEach((option: any) => {
			if (option.isAnswer === '') {
				option.isAnswer = false;
			}
		});
		return this.http.post(url, question);
	}

	getMyQuestions() {
		const url = `${this.BASE_URL}questions/my-questions`;
		return this.http.get(url);
	}

	getCurrentQuestionInfo(id: string) {
		const url = `${this.BASE_URL}/questions/${id}`;
    return this.http.get(url);
	}

  updateQuestion(question:Question, id:string){
    const url = `${this.BASE_URL}/questions/${id}`;
    return this.http.patch(url,question);
  }
}
