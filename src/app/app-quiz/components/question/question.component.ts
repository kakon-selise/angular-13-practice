import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-question',
	templateUrl: './question.component.html',
	styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
	pin: boolean = false;
	pinColor = 'grey';

	editorConfig = {
		toolbar: [
			['bold', 'italic', 'underline', 'strike'], // toggled buttons
			['blockquote', 'code-block'],

			[{ header: 1 }, { header: 2 }], // custom button values
			[{ list: 'ordered' }, { list: 'bullet' }],
			[{ script: 'sub' }, { script: 'super' }], // superscript/subscript

			
			[{ header: [1, 2, 3, 4, 5, 6, false] }],

			[{ color: [] }, { background: [] }], // dropdown with defaults from theme
			[{ font: [] }],
			[{ align: [] }],

			['clean'], // remove formatting button

			['link', 'image', 'video'], // link and image, video
		],
	};

	constructor(private fb: FormBuilder) {}

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

	onSelectionChanged = (event: any) => {
		if (event.oldRange == null) {
			this.onFocus(event);
		}
		if (event.range == null && !this.pin) {
			this.onBlur(event);
		}
	};

	onFocus(event: any) {
		event.editor.theme.modules.toolbar.container.classList.remove('kkn-show-none');
		event.editor.theme.modules.toolbar.container.classList.add('kkn-show-block');
	}

	onBlur(event: any) {
		event.editor.theme.modules.toolbar.container.classList.add('kkn-show-none');
		event.editor.theme.modules.toolbar.container.classList.remove('kkn-show-block');
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
