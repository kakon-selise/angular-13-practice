import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, exhaustMap, take } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private authService: AuthService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return this.authService.user.pipe(
			take(1),
			exhaustMap((user: any) => {
				// console.log('User value in interceptor is = ', user);
				if (!user) {
					return next.handle(request);
				}
				const modifiedReq = request.clone({
					//params: new HttpParams().set('auth', user.token),
					headers: new HttpHeaders().set('Authorization', `Bearer ${user.token}`),
				});

				// console.log('Modified req is = ', modifiedReq);
				return next.handle(modifiedReq);
			})
		);
	}
}
