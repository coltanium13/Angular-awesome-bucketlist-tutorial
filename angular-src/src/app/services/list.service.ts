import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {IArrayResult, IResult} from './types/rest.types';

import { List } from '../models/List'

import 'rxjs/add/operator/map';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class ListService {

  constructor(private httpclient: HttpClient) { }

  private serverApi = 'http://localhost:3000';

  public getAllLists(): Observable<IArrayResult<List>> {
    let URI = `${this.serverApi}/bucketlist/`;
    return this.httpclient.get<IArrayResult<List>>(URI);
  }

  public deleteList(listId : string): Observable<IResult<List>> {
    let URI = `${this.serverApi}/bucketlist/${listId}`;
    return this.httpclient.delete<IResult<List>>(URI, httpOptions)
  }

  public addList(list: List): Observable<IResult<List>> {
    let URI = `${this.serverApi}/bucketlist/`;
    let body = JSON.stringify({title: list.title, description: list.description, category: list.category});
    return this.httpclient.post<IResult<List>>(URI, body, httpOptions);
  }
}
