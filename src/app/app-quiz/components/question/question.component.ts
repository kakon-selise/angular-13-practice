import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { concatMap, from } from 'rxjs';
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
	saveQuestionDisable: boolean = false;
	pinColor = 'grey';
	myQuestions: any[];
	isLoading: boolean = false;
	error: boolean = false;
	errorMsg: string = '';
	success: boolean = false;
	successMsg: string = 'Data uploaded successfully';

	constructor(private fb: FormBuilder, private quizService: QuizService, private router: Router, private renderer: Renderer2) {}
	ngOnInit(): void {
		this.removeElement();
	}

	onFormValueChange() {
		alert('Done');
	}

	removeElement() {
		const elementToRemove = document.querySelector('.fr-wrapper div:first-of-type');
		if (elementToRemove) {
			this.renderer.removeChild(elementToRemove.parentNode, elementToRemove);
		}
	}

	addQuestionForm: FormGroup = this.fb.group({
		questions: this.fb.array([
			this.fb.group({
				question: ['', Validators.required],
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
		this.saveQuestionDisable = false;
		const newQuestion = this.fb.group({
			question: ['', Validators.required],
			image: ['imageUrl'],
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

	onSaveQuestions() {
		this.isLoading = true;
		let formData = this.addQuestionForm.getRawValue();
		this.postQuestions(formData);
	}

	removeFroalaEditorUnlicensedDiv(singleObject: any) {
		const regex = /<p.*?>.*?<\/p>/gi;
		if (singleObject.question) {
			singleObject.question = singleObject.question.replace(/&amp;lt;/g, '<');
			singleObject.question = singleObject.question
				.replace(/&lt;/g, '<')
				.replace(/&gt;/g, '>')
				.replace(/<p[^>]*>(.*?)<\/p>/gi, '')
				.replace(/<\/?[^>]+(>|$)/g, '')
				.replace(/&nbsp;/g, ' ')
				.replace(/&quot;/g, "'")
				.replace(/Powered by Froala Editor/gi, '');
		}

		if (singleObject.option) {
			singleObject.option = singleObject.option.replace(/&amp;lt;/g, '<');
			singleObject.option = singleObject.option
				.replace(/&lt;/g, '<')
				.replace(/&gt;/g, '>')
				.replace(/<p[^>]*>(.*?)<\/p>/gi, '')
				.replace(/<\/?[^>]+(>|$)/g, '')
				.replace(/&nbsp;/g, ' ')
				.replace(/&quot;/g, "'")
				.replace(/Powered by Froala Editor/gi, '');
		}
	}

	postQuestions(formData: any) {
		const questionObs = from(formData.questions).pipe(
			concatMap((question: any) => {
				this.removeFroalaEditorUnlicensedDiv(question);
				question.options.forEach((singleOptionObject: any) => {
					this.removeFroalaEditorUnlicensedDiv(singleOptionObject);
				});
				const questionData = question;
				return this.quizService.postQuestion(question);
			})
		);

		questionObs.subscribe({
			next: (res) => {
				console.log(`Question posted`);
			},
			error: (err) => {
				this.error = true;
				this.isLoading = false;
				this.errorMsg = err.statusText;
			},
			complete: () => {
				console.log(`All questions posted`);
				this.isLoading = false;
				this.error = false;
				this.success = true;
				this.getMyQuestions();
				this.addQuestionForm.reset();
				this.router.navigateByUrl('/quiz', { replaceUrl: true }).then(() => {
					window.location.reload();
				});
			},
		});
	}

	getMyQuestions() {
		this.quizService.getMyQuestions().subscribe((data: any) => {
			this.myQuestions = data;
		});
	}

	onAddQuestionSubmit() {}

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
		pastePlain: true,

		htmlAllowedEmptyTags: ['mprescripts', 'none'],
		paragraphFormat: '',
		toolbarSticky: false,
	};

	onCancelIcon() {
		this.error = false;
	}
}

// Working regex

// let str = 'fdffdf fdfdfdfdf&amp;nbsp;&amp;lt;p data-f-id=&amp;quot;pbf&amp;quot; style=&amp;quot;text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;&amp;quot;&amp;gt;Powered by &amp;lt;a href=&amp;quot;https://www.froala.com/wysiwyg-editor?pb=1&amp;quot; title=&amp;quot;Froala Editor&amp;quot;&amp;gt;Froala Editor&amp;lt;/a&amp;gt;&amp;lt;/p&amp;gt;&amp;lt;math xmlns=&quot;http://www.w3.org/1998/Math/MathML&quot;>&amp;lt;msqrt>&amp;lt;mi>d&amp;lt;/mi>&amp;lt;mi>f&amp;lt;/mi>&amp;lt;mi>g&amp;lt;/mi>&amp;lt;mi>d&amp;lt;/mi>&amp;lt;mi>f&amp;lt;/mi>&amp;lt;mi>d&amp;lt;/mi>&amp;lt;mi>f&amp;lt;/mi>&amp;lt;mi>d&amp;lt;/mi>&amp;lt;/msqrt>&amp;lt;/math>&amp;lt;p data-f-id=&quot;pbf&quot; style=&quot;text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;&quot;>Powered by &amp;lt;a href=&quot;https://www.froala.com/wysiwyg-editor?pb=1&quot; title=&quot;Froala Editor&quot;>Froala Editor&amp;lt;/a>&amp;lt;/p"';

// str = str.replace(/&amp;lt;/g, "<");
// str = str.replace(/&lt;/g, "<")
//          .replace(/&gt;/g, ">")
//          .replace(/<p[^>]*>(.*?)<\/p>/gi, "")
//          .replace(/<\/?[^>]+(>|$)/g, "")
//          .replace(/&nbsp;/g, " ")
//          .replace(/&quot;/g, "'")
// 		.replace(/Powered by Froala Editor/gi, "");
