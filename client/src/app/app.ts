import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Nav } from "../layout/nav/nav";

@Component({
  selector: 'app-root',
  imports: [Nav],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private http = inject(HttpClient);
  protected readonly title = signal('Dating App');
protected members = signal<any>([]);

  async ngOnInit(): Promise<void> {
    // Initialization logic can go here
    this.members.set(await this.getMembers());

    // Example HTTP request (uncomment to use)
  //   this.http.get('https://localhost:7046/api/members').subscribe({
  //     next: Response => this.members.set(Response),
  //     error: error => console.log(error),
  //     complete: () => console.log('completed the http request')
  // })
}
  
  // Example method to fetch members

async getMembers() {

try {
    return lastValueFrom(this.http.get('https://localhost:7046/api/members'));

} catch (error) {
  console.log(error);
  throw error;
}



}
}
