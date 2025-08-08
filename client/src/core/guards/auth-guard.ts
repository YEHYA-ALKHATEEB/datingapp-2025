import { CanActivateFn } from '@angular/router';
import { AccountService } from '../services/account-service';
import { inject } from '@angular/core';
import { ToastServices } from '../services/toast-services';

export const authGuard: CanActivateFn = () => {
  const accountService = inject(AccountService);
  const toast = inject(ToastServices);

  if(accountService.currentUser()) return true;
  else {
    toast.error('You shall not pass!');
    return false;
  }
};
