import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Nav } from "../layout/nav/nav";
import { AccountService } from '../core/services/account-service';
import { Home } from "../features/home/home";
import { User } from '../types/user';

@Component({
  selector: 'app-root',
  imports: [Nav, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private accountService = inject(AccountService);
  private http = inject(HttpClient);
protected  title = signal('Dating App');
protected members = signal<User[]>([]);

  async ngOnInit(): Promise<void> {
    // Initialization logic can go here
    this.members.set(await this.getMembers());
 this.setCurrentUser();
    // Example HTTP request (uncomment to use)
  //   this.http.get('https://localhost:7046/api/members').subscribe({
  //     next: Response => this.members.set(Response),
  //     error: error => console.log(error),
  //     complete: () => console.log('completed the http request')
  // })
}

setCurrentUser() {
  const userString = localStorage.getItem('user');
  if (!userString) {
    return
  }
  const user = JSON.parse(userString);
  this.accountService.currentUser.set(user);
}
  
  // Example method to fetch members

async getMembers() {

try {
    return lastValueFrom(this.http.get<User[]>('https://localhost:7046/api/members'));

} catch (error) {
  console.log(error);
  throw error;
}



}
}
