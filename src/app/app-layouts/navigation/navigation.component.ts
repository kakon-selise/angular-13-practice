import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/app-auth/services/auth.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
	isLoggedIn: any = false;
	isLoading: any = false;

	isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
		map((result) => result.matches),
		shareReplay()
	);

	constructor(
		private breakpointObserver: BreakpointObserver,
		private authService: AuthService,
		private loadingService: LoadingService
	) {}

	onSignOut() {
		this.authService.signOut();
	}

	ngOnInit() {
		this.authService.isLoggedIn.subscribe({
			next: (status) => {
				this.isLoggedIn = status;
			},
		});

		this.loadingService.isLoading.subscribe((status: any) => {
			this.isLoading = status;
		});

		this.authService.autoSignIn();
	}
}
