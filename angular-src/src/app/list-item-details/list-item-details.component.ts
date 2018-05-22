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

  constructor(private listServ: ListService) { }

  ngOnInit() {
  }

  public DisplayListItems(list: List){
    this.displayList = list;
  }

  public UpdateList(list: List){
    this.listServ.updateList(list).subscribe((result) => {
      if (result.error || null) {
        // do something with the error
        alert('Error Updating!');
      } else {
        //do something if update went well
        alert('Update Successful!');
      }
    });
  }

  public  AddNewItem(listID: string, newItem: string): void{
    //alert(listID + newItem);
    this.listServ.addListItem(listID, newItem).subscribe((result) => {
      if (result.error || null) {
        // do something with the error
      } else {
        //show the newly added item in the list detail list
      }
    });
  }
  //todo: make function to add new item to list. Add html. list sevice put??


  //todo: remove list detials component view when you delete a list that is currently showing details.

}
