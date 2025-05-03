import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as AuthActions from './store/auth/auth.actions';
import { AppState } from './store/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'task-manager';
  isAuthenticated = false;

  constructor(private store: Store<AppState>, private router: Router) {
    this.store
      .select((state) => state.auth.token)
      .subscribe((token) => (this.isAuthenticated = !!token));
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/auth/login']);
  }
}

