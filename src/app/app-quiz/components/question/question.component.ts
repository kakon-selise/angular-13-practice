import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';




@Component({
	selector: 'app-question',
	templateUrl: './question.component.html',
	styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
	public Editor:any = ClassicEditor;

	public editorConfig = {
		toolbar: {
		  items: [
			'heading',
			'|',
			'bold',
			'italic',
			'link',
			'bulletedList',
			'numberedList',
			'|',
			'undo',
			'redo'
		  ]
		}
	  };
	
	  changeEditorToolbar(displayValue:any)
	  {
		  let elements =  Array.from(document.getElementsByClassName('ck-editor__top') as HTMLCollectionOf<HTMLElement>);
		  elements[0].style.display = displayValue;
	  }

	constructor(private fb: FormBuilder) {}

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
