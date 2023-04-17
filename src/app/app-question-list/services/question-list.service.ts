import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class QuestionListService {
  BASE_URL = 'http://input.quizhero.easymemo.net/api/v1/'

	constructor(private http: HttpClient) {}

  getAllQuestion(userId: string){
    const url = `${this.BASE_URL}questions?insertedBy=${userId}&limit=10&page=2`
    this.http.get(url)
  }
}
