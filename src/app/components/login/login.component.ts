import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginRequestForm: FormGroup = new FormGroup({});
  error: any;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loginRequestForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  submit(): void {
    if (!this.loginRequestForm.valid) {
      this.error = {message: 'Please provide login details'};
      return;
    }
    this.error = {message: ''};
    console.log('value: ', this.loginRequestForm?.value);
    this.authService.authenticate(this.loginRequestForm?.value, this.error);
    console.log('error: ', this.error);
  }

}
