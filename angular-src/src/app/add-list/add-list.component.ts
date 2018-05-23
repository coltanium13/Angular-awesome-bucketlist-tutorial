import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { List } from '../models/List';
import { ListService } from '../services/list.service';


@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})
export class AddListComponent implements OnInit {

  private newList: List;
  @Output() addList: EventEmitter<List> = new EventEmitter<List>();

  constructor(private listServ: ListService) { }

  ngOnInit() {
    this.resetNewList();
  }

  private resetNewList() {
      this.newList = {
          title: '',
          category: '',
          description: '',
          _id: '',
          items:[{
            text: ''
          }]
        }
  }

  public onSubmit() {
    this.listServ.addList(this.newList).subscribe((result) => {
        if (result.error || null) {
            // do something with the error
        } else {
            this.addList.emit(result.data);
            this.resetNewList();
        }
    });

  }
}
