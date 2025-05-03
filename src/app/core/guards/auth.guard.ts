import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { map } from 'rxjs/operators';

export const authGuard = () => {
  const store = inject(Store<AppState>);
  const router = inject(Router);

  return store.select((state) => state.auth.token).pipe(
    map((token) => {
      if (token) {
        return true;
      } else {
        router.navigate(['/auth/login']);
        return false;
      }
    })
  );
};

