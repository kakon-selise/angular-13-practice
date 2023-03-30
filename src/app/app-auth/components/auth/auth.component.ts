import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
	isLoginMode: boolean = true;
	isLoading: boolean = false;
	isRequestSuccessful: boolean = false;
	errorMessage: string = '';
	buttonText: string = '';

	constructor(
		private fb: FormBuilder,
		private router: Router,
		private authService: AuthService,
		private loadingService: LoadingService
	) {}

	authForm: FormGroup = this.fb.group({
		name: ['', []],
		email: ['', [Validators.required, Validators.email]],
		password: ['', [Validators.required]],
	});

	onModeChange() {
		this.isLoginMode = !this.isLoginMode;
	}

	onAuthFormSubmit() {
		if (this.authForm.invalid) return;

		this.loadingService.isLoading.next(true);
		const authFormValue = this.authForm.value;
		const name = authFormValue.name;
		const email = authFormValue.email;
		const password = authFormValue.password;
		let authObservable: Observable<any>;

		if (this.isLoginMode) {
			authObservable = this.authService.signIn(email, password);
		} else {
			authObservable = this.authService.signUp(name, email, password);
		}

		authObservable.subscribe({
			next: (response) => {
				this.loadingService.isLoading.next(false);
				this.router.navigate(['/quiz']);
			},
			error: (error) => {
				this.errorMessage = error;
				this.loadingService.isLoading.next(false);
			},
			complete: () => {
				this.errorMessage = '';
				this.isRequestSuccessful = true;
				this.authService.isLoggedIn.next(true);
				setTimeout(() => {
					this.isRequestSuccessful = false;
					this.authForm.reset();
					this.router.navigate(['/quiz']);
				}, 2000);
			},
		});
	}
}
