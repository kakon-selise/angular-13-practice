import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { QuizService } from 'src/app/app-quiz/services/quiz.service';

// Load WIRISplugins.js dynamically
const jsDemoImagesTransform = document.createElement('script');
jsDemoImagesTransform.type = 'text/javascript';
jsDemoImagesTransform.src = 'https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image';
// Load generated scripts.
document.head.appendChild(jsDemoImagesTransform);

@Component({
	selector: 'app-edit-question',
	templateUrl: './edit-question.component.html',
	styleUrls: ['./edit-question.component.scss'],
})
export class EditQuestionComponent implements OnInit {
	saveQuestionDisable: boolean = false;
	pinColor = 'grey';
	myQuestions: any[];
	isLoading: boolean = true;
	error: boolean = false;
	errorMsg: string = '';
	success: boolean = false;
	successMsg: string = 'Data uploaded successfully';
	currentId: string = '';
	questionInfo: any = [];

	constructor(
		private fb: FormBuilder,
		private quizService: QuizService,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.route.params.subscribe((data: Params) => {
			this.currentId = data['id'];
			this.getCurrentQuestionInfo(this.currentId);
		});
	}

	getCurrentQuestionInfo(id: string) {
		this.quizService.getCurrentQuestionInfo(id).subscribe((question) => {
			this.questionInfo = question;
			this.editQuestionForm.patchValue({
				question: this.questionInfo.data.question,
				image: 'imgUrl', // replace with the actual image url if needed
				subject: this.questionInfo.data.subject,
				chapter: this.questionInfo.data.chapter,
				source: this.questionInfo.data.source,
			});
			// set options array values
			const optionsArray = this.editQuestionForm.get('options') as FormArray;
			this.questionInfo.data.options.forEach((option: any, index: number) => {
				optionsArray.at(index).patchValue({
					option: option.option,
					isAnswer: option.isAnswer,
				});
			});

			this.isLoading = false;
		});

	}

	editQuestionForm: FormGroup = this.fb.group({
		question: [this.questionInfo?.question, Validators.required],
		image: ['imgUrl'],
		options: this.fb.array([
			this.fb.group({
				option: ['', [Validators.required]],
				isAnswer: ['', []],
			}),

			this.fb.group({
				option: ['', [Validators.required]],
				isAnswer: ['', []],
			}),

			this.fb.group({
				option: ['', [Validators.required]],
				isAnswer: ['', []],
			}),

			this.fb.group({
				option: ['', [Validators.required]],
				isAnswer: ['', []],
			}),
		]),
		subject: ['', Validators.required],
		chapter: ['', Validators.required],
		source: ['', Validators.required],
	});

	get QuestionsArray() {
		return this.editQuestionForm.get('questions') as FormArray;
	}

	get optionsArray() {
		return this.editQuestionForm.get('options') as FormArray;
	}

	onSaveQuestions() {
		this.isLoading = true;
		let formData = this.editQuestionForm.getRawValue();
		formData.questions.forEach((questionData: any) => {
			this.quizService.postQuestion(questionData).subscribe({
				next: (data) => {},

				error: (err) => {
					this.error = true;
					this.isLoading = false;
					this.errorMsg = err.statusText;
				},

				complete: () => {
					this.isLoading = false;
					this.error = false;
					this.success = true;
					setTimeout(() => {
						this.getMyQuestions();
						this.editQuestionForm.reset();
						this.router.navigateByUrl('/quiz', { replaceUrl: true }).then(() => {
							window.location.reload();
						});
					}, 2000);
				},
			});
		});
	}

	getMyQuestions() {
		this.quizService.getMyQuestions().subscribe((data: any) => {
			this.myQuestions = data;
		});
	}

	onEditQuestionSubmit() {}

	onUpdateQuestions(){
		this.isLoading = true;
		const updatedQuestion = this.editQuestionForm.getRawValue();
			this.quizService.updateQuestion(updatedQuestion, this.currentId).subscribe({
				next: (data) => {},

				error: (err) => {
					this.error = true;
					this.isLoading = false;
					this.errorMsg = err.statusText;
				},

				complete: () => {
					this.isLoading = false;
					this.error = false;
					this.success = true;
					setTimeout(() => {
						this.getMyQuestions();
						this.editQuestionForm.reset();
						this.router.navigate(['/myQuestions']);
					}, 2000);
				},
			});
		
	}

	// Set App Title.
	title = 'Angular froala demo';

	// Initialize the editor content.
	public content: string =
		'<p class="text"> Double click on the following formula to edit it.</p><p style="text-align: center;"><math><mi>z</mi><mo>=</mo><mfrac><mrow><mo>-</mo><mi>b</mi><mo>&PlusMinus;</mo><msqrt><msup><mi>b</mi><mn>3</mn></msup><mo>-</mo><mn>4</mn><mi>a</mi><mi>c</mi></msqrt></mrow><mrow><mn>2</mn><mi>a</mi></mrow></mfrac></math></p>';

	public options: Object = {
		toolbarButtons: ['undo', 'redo', 'bold', 'italic', '|', 'wirisEditor', 'wirisChemistry', 'insertImage'],
		imageEditButtons: ['wirisEditor', 'wirisChemistry', 'imageDisplay', 'imageAlign', 'imageInfo', 'imageRemove'],

		htmlAllowedTags: ['.*'],
		htmlAllowedAttrs: ['.*'],

		// for remove p tag by default
		//  It's an enum, you can specify the values numerically. The following assignment works for me:
		// 0 = ENTER_P
		// 1 = ENTER_DIV
		// 2 = ENTER_BR

		enter: 2,

		htmlAllowedEmptyTags: ['mprescripts', 'none'],

		paragraphFormat: '',
		toolbarSticky: false,
	};

	onCancelIcon() {
		this.error = false;
	}
}
