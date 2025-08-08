import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastServices } from '../../core/services/toast-services';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  protected accountService = inject(AccountService);
  private router = inject(Router);
  private toast = inject(ToastServices);
  protected credentials: any = {}
  login() {
    this.accountService.login(this.credentials).subscribe({
      next: () => {
        this.router.navigateByUrl('/members');
        this.toast.success('Login successful');
        this.credentials = {};
      },
      error: error => {
        console.log(error.error);
        this.toast.error(error.error);
      },
     
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
