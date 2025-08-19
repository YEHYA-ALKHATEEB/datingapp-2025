import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';
import { ToastServices } from '../services/toast-services';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastServices);
  const router = inject(Router);
  return next(req).pipe(
    catchError(error => {
      if (error) {
        switch (error.status) {
          case 400:
            toast.error(error.error);
          break;
          case 401:
            toast.error('Unauthorized');
            break;
          case 404:
            toast.error('Not found');
            break;
            case 500:
              toast.error('Server error');
              break;
          default:
            toast.error('Something went wrong');
          break;
        }
      }
      throw error;
    })
  );
};
