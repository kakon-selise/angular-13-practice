import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Subject, tap } from 'rxjs';
import { ErrorService } from 'src/app/shared/services/error.service';
import { User } from '../models/User.model';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	signUpUrl = 'http://input.quizhero.easymemo.net/api/v1/auth/register';
	signInUrl = 'http://input.quizhero.easymemo.net/api/v1/auth/login';
	user = new BehaviorSubject<User>(null!);
	isLoggedIn = new Subject();

	constructor(private http: HttpClient, private errorService: ErrorService, private router: Router) {}

	signUp(name: string, email: string, password: string) {
		const signUpInfo = {
			name: name,
			email: email,
			password: password,
		};
		return this.http.post<any>(this.signUpUrl, signUpInfo).pipe(
			catchError((err) => {
				return this.errorService.handleError(err);
			}),
			tap((token) => {
				this.authenticatedUser(email, token);
			})
		);
	}

	signIn(email: string, password: string) {
		const signInInfo = {
			email: email,
			password: password,
		};
		return this.http.post<any>(this.signInUrl, signInInfo).pipe(
			catchError((err) => {
				return this.errorService.handleError(err);
			}),
			tap((token) => {
				this.authenticatedUser(email, token);
			})
		);
	}

	authenticatedUser(email: string, token: string) {
		const newUser = new User(email, token);
		this.user.next(newUser);
		this.isLoggedIn.next(true);
		localStorage.setItem('user', JSON.stringify(newUser));
	}

	autoSignIn() {
		const userInfo = JSON.parse(localStorage.getItem('user')!);

		if (!userInfo) return;

		const loggedInUser = new User(userInfo.email, userInfo.token, userInfo.name);

		this.user.next(loggedInUser);
		this.isLoggedIn.next(true);
	}

	signOut() {
		this.user.next(null!);
		this.router.navigate(['auth']);
		localStorage.removeItem('user');
		this.isLoggedIn.next(false);
	}
}
