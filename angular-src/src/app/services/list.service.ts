import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { List } from '../models/List'

import 'rxjs/add/operator/map';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class ListService {

  constructor(private httpclient: HttpClient) { }

  private serverApi= 'http://localhost:3000';

  public getAllLists():Observable<List[]> {

    let URI = `${this.serverApi}/bucketlist/`;
    return this.httpclient.get<List[]>(URI).map(data => data.lists);
  }

  public deleteList(listId : string) {
    let URI = `${this.serverApi}/bucketlist/${listId}`;
    return this.httpclient.delete(URI, httpOptions)
  }

  public addList(list: List) {
    let URI = `${this.serverApi}/bucketlist/`;
    let headers = new Headers;
    let body = JSON.stringify({title: list.title, description: list.description, category: list.category});
    console.log(body);
    headers.append('Content-Type', 'application/json');
    return this.httpclient.post(URI, body ,httpOptions)
  }
}
