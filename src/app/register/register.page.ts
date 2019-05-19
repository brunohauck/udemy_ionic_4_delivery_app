import { Component, OnInit } from '@angular/core';
import { UserService } from '../login/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  constructor(
    private userService: UserService,
    private router: Router) { }

  register(form) {
    this.userService.createUser(form.value).subscribe((res) => {
      console.log(res);
      this.router.navigateByUrl('home');
    });
  }

}
