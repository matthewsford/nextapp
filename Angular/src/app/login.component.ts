import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import {SessionService} from './session.service';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private sessionService: SessionService,
              private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],  // , Validators.pattern(EMAIL_REGEX)],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }
  ngOnInit(): void {
    // this.sessionService.login('a@example.com', 'pleaseletmein');
  }

  onLogin(): void {
    this.sessionService.login(this.username, this.password, this.rememberMe);
  }

  get username(): string {
    const control = this.form.get('username');
    if (control != null) {
      return control.value;
    }
    return '';
  }


  get password(): string {
    const control = this.form.get('password');
    if (control != null) {
      return control.value;
    }
    return '';
  }


  get rememberMe(): boolean {
    const control = this.form.get('rememberMe');
    if (control != null) {
      return control.value;
    }
    return false;
  }
}
