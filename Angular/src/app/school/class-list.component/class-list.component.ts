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
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatSort} from '@angular/material';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import {Router} from '@angular/router';

import {StudentService} from '../student.service';
import {Student} from '../student';

@Component({
  selector: 'app-student-list',
  templateUrl: './class-list.component.html',
  styleUrls: ['./class-list.component.sass']
})
export class ClassListComponent implements OnInit {
  displayedColumns = ['actions', 'userId', 'givenName', 'surname'];
  exampleDatabase = new ExampleDatabase();
  dataSource: StudentDataSource | null;

  @ViewChild('filter') filter: ElementRef;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private router: Router,
              private studentService: StudentService) {
  }

  ngOnInit() {

    // , this.paginator
    this.dataSource = new StudentDataSource(this.studentService, this.sort);
    /*
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
     */
  }

  onNewStudent(): void {
    this.router.navigate(['/students/new'])
      .then((value) => {
        // TODO
      })
      .catch((reason) => {
        // TODO
      });
  }

  onEditStudent(id: string): void {
    this.router.navigate([`/students/${id}`])
      .then((value) => {
        // TODO
      })
      .catch((reason) => {
        // TODO
      });
  }

  onDeleteStudent(id: string): void {
    this.studentService.deleteStudent(id)
      .subscribe(
        (next) => {
          // TODO
        },
        (err) => {
          // TODO
        },
        () => {
          // TODO
        }
      );
  }
}

export class StudentDataSource extends DataSource<Student> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  constructor(private studentService: StudentService,
              // private _paginator: MatPaginator,
              private _sort: MatSort) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Student[]> {
    const displayDataChanges = [
      // this._exampleDatabase.dataChange,
      this._filterChange,
      // this._paginator.page,
      this._sort.sortChange,
    ];

    return this.studentService.getAllStudents();
  }

  disconnect() {
  }

  /** Returns a sorted copy of the database data. */
  // getSortedData(): UserData[] {
    /* const data = this._exampleDatabase.data.slice().filter((item: UserData) => {
      const searchStr = (item.name + item.color).toLowerCase();
      return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
    });

    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'userId':
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case 'userName':
          [propertyA, propertyB] = [a.name, b.name];
          break;
        case 'progress':
          [propertyA, propertyB] = [a.progress, b.progress];
          break;
        case 'color':
          [propertyA, propertyB] = [a.color, b.color];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });*/
    // return null;
  // }
}

/** Constants used to fill up our data base. */
const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
  'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleDatabase {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<UserData[]> = new BehaviorSubject<UserData[]>([]);

  get data(): UserData[] {
    return this.dataChange.value;
  }

  constructor() {
    // Fill up the database with 100 users.
    for (let i = 0; i < 100; i++) {
      this.addUser();
    }
  }

  /** Adds a new user to the database. */
  addUser() {
    const copiedData = this.data.slice();
    copiedData.push(this.createNewUser());
    this.dataChange.next(copiedData);
  }

  /** Builds and returns a new User. */
  private createNewUser() {
    const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

    return {
      id: (this.data.length + 1).toString(),
      name: name,
      progress: Math.round(Math.random() * 100).toString(),
      color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
    };
  }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  constructor(private _exampleDatabase: ExampleDatabase,
              private _paginator: MatPaginator,
              private _sort: MatSort) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<UserData[]> {
    const displayDataChanges = [
      this._exampleDatabase.dataChange,
      this._filterChange,
      this._paginator.page,
      this._sort.sortChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = this.getSortedData();

      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }

  disconnect() {
  }

  /** Returns a sorted copy of the database data. */
  getSortedData(): UserData[] {
    const data = this._exampleDatabase.data.slice().filter((item: UserData) => {
      const searchStr = (item.name + item.color).toLowerCase();
      return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
    });

    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'userId':
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case 'userName':
          [propertyA, propertyB] = [a.name, b.name];
          break;
        case 'progress':
          [propertyA, propertyB] = [a.progress, b.progress];
          break;
        case 'color':
          [propertyA, propertyB] = [a.color, b.color];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
