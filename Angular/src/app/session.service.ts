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
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import * as scrypt from 'scrypt-async';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
// import * as sjcl from 'sjcl';
// import {BitArray} from 'sjcl';

@Injectable()
export class SessionService {
  public constructor(private http: HttpClient) {
  }

  public login(username: string, password: string, rememberMe: boolean): Observable<Object> {
    return Observable.create((observer: Observer<any>) => {
      const salt = 'SodiumChloride';
      this.scrypt(username, password, salt, (derivedKey) => {
        this.http.post('http://localhost:5000/api/accounts/login', {
          username,
          'password': derivedKey,
          rememberMe
        }).subscribe(
          data => observer.next(data),
          err => observer.error(err),
          () => observer.complete()
        );
      });
    });
  }

  public logout(): Observable<Object> {
    return this.http.post('http://localhost:5000/api/accounts/logout', {});
  }

  public register(username: string, password: string): Observable<Object> {
    return Observable.create((observer: Observer<any>) => {
      const salt = 'SodiumChloride';
      this.scrypt(username, password, salt, (derivedKey) => {
        this.http.post('http://localhost:5000/api/accounts/register', {
          username,
          'password': derivedKey
        }).subscribe(
          data => observer.next(data),
          err => observer.error(err),
          () => observer.complete()
        );
      });
    });
  }

  private scrypt(username: string, passphrase: string, salt: string, cb: (derivedKey: string) => void): void {
    const computationCost = 14;
    const blockSize = 8;
    const derivedKeyLen = 64;

    scrypt(
      passphrase.normalize('NFKC'),
      salt.normalize('NFKC'),
      computationCost,
      blockSize,
      derivedKeyLen,
      function (derivedKey) {
        console.log(derivedKey);
        cb(derivedKey);
      },
      'hex'
    );
  }
}
