import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { catchError, map, tap} from 'rxjs/operators';

import {IArrayResult, IResult} from './types/rest.types';

import { List } from '../models/List';

import 'rxjs/add/operator/map';
import {ListItem} from "../models/ListItem";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class ListService {

  constructor(private httpclient: HttpClient) { }

  private serverApi = 'http://localhost:3000';
  private newItem: ListItem = {text: ''};

  public getAllLists(): Observable<IArrayResult<List>> {
    let URI = `${this.serverApi}/bucketlist/`;
    return this.httpclient.get<IArrayResult<List>>(URI)
      .pipe(
        tap(_res => console.log('GetAllLists: ' + _res.data))
      );
  }

  public getList(listID: string): Observable<IResult<List>> {
    let URI = `${this.serverApi}/bucketlist/${listID}`;
    return this.httpclient.get<IResult<List>>(URI, httpOptions);
  }

  public deleteList(listId : string): Observable<IResult<List>> {
    let URI = `${this.serverApi}/bucketlist/${listId}`;
    return this.httpclient.delete<IResult<List>>(URI, httpOptions)
  }

  public addList(list: List): Observable<IResult<List>> {
    let URI = `${this.serverApi}/bucketlist/`;
    let body = JSON.stringify({title: list.title, description: list.description, category: list.category,
      items: list.items} );
    return this.httpclient.post<IResult<List>>(URI, body, httpOptions);
  }

  public addListItem(listID: string, listItem: string): Observable<IResult<List>>{
    this.newItem.text = listItem;
    let URI = `${this.serverApi}/bucketlist/${listID}`;
    let body = JSON.stringify({_id: listID, items: this.newItem} );
    return this.httpclient.put<IResult<List>>(URI, body, httpOptions).pipe(tap(_res => (console.log('add list item service res: ' + _res))));
  }

  public updateList(list: List): Observable<IResult<List>>{
    let URI = `${this.serverApi}/bucketlist/${list._id}`;
    let body = JSON.stringify({list} );
    return this.httpclient.put<IResult<List>>(URI, body, httpOptions);
  }
}
