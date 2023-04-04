import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-user-info',
	templateUrl: './user-info.component.html',
	styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
	
  userDataFromTs = {
		name: 'Kakon Mehedi',
		userAge: 26,
		dept: 'CSE',
	};

  userDataFromTsV2 = {
		name: 'Borsha personal',
		userAge: 22,
		dept: 'EEE',
	};

  userDataFromTsV3 = {
		name: 'Imrose',
		userAge: 21,
		dept: 'ICE',
	};

	constructor() {}

	ngOnInit(): void {}
}
