/*   Copyright 2017 Matthew Ford <matthew@matthewford.us>
**
**   Licensed under the Apache License, Version 2.0 (the "License");
**   you may not use this file except in compliance with the License.
**   You may obtain a copy of the License at
**
**     http://www.apache.org/licenses/LICENSE-2.0
**
**   Unless required by applicable law or agreed to in writing, software
**   distributed under the License is distributed on an "AS IS" BASIS,
**   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
**   See the License for the specific language governing permissions and
**   limitations under the License.
*/

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {Identifiable} from './identifiable';
import {Observer} from 'rxjs/Observer';

export abstract class DeleteStatus {
  // const Accepted = Symbol("accepted");
}

@Injectable()
export class ResourceService<T extends Identifiable> {
  baseUrl = 'http://localhost:5000/api';
  controllerName = 'classes';

  constructor(private http: HttpClient) {
  }

  public createResource(resource: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${this.controllerName}`, resource);
  }

  /**
   * @param type
   * @param {string} id the id of the student to lookup
   * @returns {Observable<Identifiable>}
   */
  public getResource(type: { new(): T ; }, id: string): Observable<T> {
    if (id === 'new') {
      return Observable.create((observer: Observer<T>) => {
        observer.next(new type());
        observer.complete();
      });
    } else {
      return this.http.get<T>(`${this.baseUrl}/${this.controllerName}/${id}`);
    }
  }

  /**
   * @returns {Observable<Identifiable[]>}
   */
  public getAllResources(): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}/${this.controllerName}`);
  }

  /**
   * @param {Class} resource
   */
  updateResource(resource: T): Observable<boolean> {
    return Observable.create((observer: Observer<boolean>) => {
      this.http.put(`${this.baseUrl}/${this.controllerName}/${resource.id}`,  resource, {observe: 'response'})
        .subscribe(
          data => {
            observer.next(data.ok);
          },
          err => {
            observer.error(err);
          },
          () => {
            observer.complete();
          }
        );
    });
  }

  /**
   * @param {string} id
   * @returns {Observable<boolean>}
   */
  public deleteResource(id: string): Observable<boolean> {
    return Observable.create((observer: Observer<boolean>) => {
      this.http.delete(`${this.baseUrl}/${this.controllerName}/${id}`, {observe: 'response'})
        .subscribe(
          data => {
            observer.next(data.ok);
          },
          err => {
            observer.error(err);
          },
          () => {
            observer.complete();
          }
        );
    });
  }
}
