import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/app-auth/services/auth.service';
import { QuestionListService } from '../../services/question-list.service';

@Component({
  selector: 'app-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.scss']
})
export class AllQuestionsComponent implements OnInit {
  currentUserId:string;
  myData:object;

  constructor(private questionListService: QuestionListService, private authService: AuthService, private http:HttpClient) { }

  ngOnInit(): void {
    this.getCurrentProfileId()
  }

  getCurrentProfileId(){
    this.authService.getMyProfile().subscribe((profileData)=>{
    })
  }

  getAllQuestions(){

  }

  onGetMyProfile(){
    const url = `http://input.quizhero.easymemo.net/api/v1/users/my-profile`
    this.http.get(url).subscribe((data)=>{
      this.myData = data;
    })
  }

}
