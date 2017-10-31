/*   Copyright 2017 Matthew Ford <matthew@matthewford.us>
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */
import {Component, OnInit} from '@angular/core';
import {SessionService} from './session.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {
  form: FormGroup;
  status: string;

  constructor(private sessionService: SessionService,
  private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  /*onKey(event: any) { // without type info
    this.values += event.target.value + ' | ';
  }*/
  onRegister(): void {
    this.sessionService.register(this.email, this.password).subscribe(
      data => {
        this.status = 'success';
      },
      err => {
        this.status = err;
      },
      () => {
      }
    );
  }

  get email(): string {
    const control = this.form.get('email');
    if (control != null) {
      return control.value;
    }
    return '';
  }


  get confirmPassword(): string {
    const control = this.form.get('confirmPassword');
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
}
