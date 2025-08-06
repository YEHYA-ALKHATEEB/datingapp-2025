import { Component, input, output } from '@angular/core';
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

  cancelRegister = output<boolean>();

 protected credentials = {} as RegisterCredentials;
 
 register() {
  console.log(this.credentials);

 }

 cancel() {
  this.cancelRegister.emit(false);
 }
}
