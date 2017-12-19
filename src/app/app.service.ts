import { Injectable, EventEmitter } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'


@Injectable()
export class AppService {

  constructor(private http: Http) { }  

  getData(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts').map(res => res.json());
  }

  submit(newData) {
    let newObj = JSON.stringify({title: newData, body: newData, userId: 1});
    return this.http.post('https://jsonplaceholder.typicode.com/posts', newObj);
  }

  delete(objectIndex) {
    return this.http.delete('https://jsonplaceholder.typicode.com/posts/' + objectIndex);
  }
}