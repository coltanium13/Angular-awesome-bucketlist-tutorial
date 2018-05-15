import { Component, OnInit } from '@angular/core';
import {List} from "../models/List";

@Component({
  selector: 'app-list-item-details',
  templateUrl: './list-item-details.component.html',
  styleUrls: ['./list-item-details.component.css']
})
export class ListItemDetailsComponent implements OnInit {

  private displayList: List;

  constructor() { }

  ngOnInit() {
  }

  public DisplayListItems(list: List){
    alert(list._id);
    this.displayList = list;
  }
}
