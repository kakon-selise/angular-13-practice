import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizService } from '../../services/quiz.service';

// Load WIRISplugins.js dynamically
const jsDemoImagesTransform = document.createElement('script');
jsDemoImagesTransform.type = 'text/javascript';
jsDemoImagesTransform.src = 'https://www.wiris.net/demo/plugins/app/WIRISplugins.js?viewer=image';
// Load generated scripts.
document.head.appendChild(jsDemoImagesTransform);
@Component({
	selector: 'app-question',
	templateUrl: './question.component.html',
	styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
	pin: boolean = false;
	pinColor = 'grey';
	myQuestions: any[];

	constructor(private fb: FormBuilder, private quizService: QuizService) {}

	togglePin() {
		this.pin = !this.pin;

		if (this.pin) {
			this.pinColor = 'green';
		}

		if (!this.pin) {
			this.pinColor = 'grey';
			const elements = document.querySelectorAll('.kkn-show-block');

			for (let i = 0; i < elements.length; i++) {
				elements[i].classList.add('kkn-show-none');
				elements[i].classList.remove('kkn-show-block');
			}
		}
	}

	addQuestionForm: FormGroup = this.fb.group({
		questions: this.fb.array([
			this.fb.group({
				question: ['', Validators.required],
				image: ['', Validators.required],
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
			}),
		]),
	});

	get QuestionsArray() {
		return this.addQuestionForm.get('questions') as FormArray;
	}

	get optionsArray() {
		return (this.addQuestionForm.get('questions') as FormArray).at(0).get('options') as FormArray;
	}

	onAddNewQuestion() {

		const newQuestion = this.fb.group({
			question: ['', Validators.required],
			image: ['', Validators.required],
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

		this.QuestionsArray.push(newQuestion);
	}

	onSaveQuestions(){
		let formData = this.addQuestionForm.getRawValue(); 
		formData.questions.forEach((questionData: any)=>{
			this.quizService.postQuestion(questionData).subscribe((data)=>{
				this.getMyQuestions();
			})
		});

	}

	getMyQuestions(){
		this.quizService.getMyQuestions().subscribe((data:any)=>{
			this.myQuestions = data;
		})
	}

	onAddQuestionSubmit() {
		
	}

	ngOnInit(): void {}

	// Set App Title.
	title = 'Angular froala demo';

	// Initialize the editor content.
	public content: string =
		'<p class="text"> Double click on the following formula to edit it.</p><p style="text-align: center;"><math><mi>z</mi><mo>=</mo><mfrac><mrow><mo>-</mo><mi>b</mi><mo>&PlusMinus;</mo><msqrt><msup><mi>b</mi><mn>3</mn></msup><mo>-</mo><mn>4</mn><mi>a</mi><mi>c</mi></msqrt></mrow><mrow><mn>2</mn><mi>a</mi></mrow></mfrac></math></p>';

	// Set options for the editor.
	public options: Object = {
		// Define the toolbar options for the froala editor.
		toolbarButtons: ['undo', 'redo', 'bold', 'italic', '|', 'wirisEditor', 'wirisChemistry', 'insertImage'],
		// Add [MW] uttons to the image editing popup Toolbar.
		imageEditButtons: ['wirisEditor', 'wirisChemistry', 'imageDisplay', 'imageAlign', 'imageInfo', 'imageRemove'],
		// Allow all the tags to understand the mathml
		htmlAllowedTags: ['.*'],
		htmlAllowedAttrs: ['.*'],
		// List of tags that are not removed when they have no content inside
		// so that formulas renderize propertly
		htmlAllowedEmptyTags: ['mprescripts', 'none'],
		// In case you are using a different Froala editor language than default,
		// language: 'es',
		// You can choose the language for the MathType editor, too:
		// @see: https://docs.wiris.com/en/mathtype/mathtype_web/sdk-api/parameters#regional_properties
		// mathTypeParameters: {
		//   editorParameters: { language: 'es' },
		// },
	};
}
