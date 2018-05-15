import { Component, OnInit } from '@angular/core';
import {List} from "../models/List";
import {ListItem} from "../models/ListItem";
import {ListService} from "../services/list.service";

@Component({
  selector: 'app-list-item-details',
  templateUrl: './list-item-details.component.html',
  styleUrls: ['./list-item-details.component.css']
})
export class ListItemDetailsComponent implements OnInit {

  private displayList: List;
  private newListItem: ListItem;

  constructor(private listServ: ListService) { }

  ngOnInit() {
  }

  public DisplayListItems(list: List){
    this.displayList = list;
  }

  public  AddNewItem(listID: string, newItem: string): void{
    //alert(listID + newItem);
    this.listServ.addListItem(listID, newItem)
  }
  //todo: make function to add new item to list. Add html. list sevice put??


  //todo: remove list detials component view when you delete a list that is currently showing details.

}
