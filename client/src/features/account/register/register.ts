import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterCredentials, User } from '../../../types/user';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
   membersFromHome = input.required<User[]>();
 protected credentials = {} as RegisterCredentials;
 
 register() {
  console.log(this.credentials);

 }

 cancel() {
  console.log('cancelled');
  // Reset the form or perform any other necessary actions
 }
}
