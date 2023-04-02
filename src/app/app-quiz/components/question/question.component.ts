import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-question',
	templateUrl: './question.component.html',
	styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
	editorConfig = {
		toolbar: [
			['bold', 'italic', 'underline', 'strike'], // toggled buttons
			['blockquote', 'code-block'],

			[{ header: 1 }, { header: 2 }], // custom button values
			[{ list: 'ordered' }, { list: 'bullet' }],
			[{ script: 'sub' }, { script: 'super' }], // superscript/subscript
			[{ indent: '-1' }, { indent: '+1' }], // outdent/indent
			[{ direction: 'rtl' }], // text direction

			[{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
			[{ header: [1, 2, 3, 4, 5, 6, false] }],

			[{ color: [] }, { background: [] }], // dropdown with defaults from theme
			[{ font: [] }],
			[{ align: [] }],

			['clean'], // remove formatting button

			['link', 'image', 'video'], // link and image, video
		],
	};

	constructor(private fb: FormBuilder) {}

	onSelectionChanged = (event: any) => {
		if (event.oldRange == null) {
			this.onFocus(event);
		}
		if (event.range == null) {
			this.onBlur(event);
		}
	};

	onFocus(event: any) {
		event.editor.theme.modules.toolbar.container.classList.remove('show-none');
		event.editor.theme.modules.toolbar.container.classList.add('show-block');
	}

	onBlur(event: any) {
		event.editor.theme.modules.toolbar.container.classList.add('show-none')
		event.editor.theme.modules.toolbar.container.classList.remove('show-block')
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

	onAddQuestionSubmit() {
		console.log(this.addQuestionForm.value);
	}

	ngOnInit(): void {}
}
