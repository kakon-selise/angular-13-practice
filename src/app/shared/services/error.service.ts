import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ErrorService {
	constructor() {}

	handleError(err: any) {
		console.log(err);
		return err;
	}
}
