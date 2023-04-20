import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Question } from '../../models/question.model';
import { QuizService } from '../../services/quiz.service';

@Component({
	selector: 'app-my-questions',
	templateUrl: './my-questions.component.html',
	styleUrls: ['./my-questions.component.scss'],
})
export class MyQuestionsComponent implements OnInit {
	myQuestions: Question[] = [];
  isLoading: boolean = true;

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private quizService: QuizService, private router:Router) {}

	ngOnInit(): void {
		this.getMyQuestions();
	}

  dataSource: MatTableDataSource<Question>;

	getMyQuestions() {
		this.quizService.getMyQuestions().subscribe((questions: any) => {
			this.myQuestions = questions.data;
			this.dataSource = new MatTableDataSource(this.myQuestions);
      this.dataSource.sort = this.sort;
			this.dataSource.paginator = this.paginator;
      this.isLoading = false;
		});
	}

	displayedColumns: string[] = ['question', 'image', 'subject', 'chapter', 'source'];


	getRowData(row: Question) {
    this.router.navigate([`/myQuestions/${row.id}`])
		console.log(row);

	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
	}

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

  
}
