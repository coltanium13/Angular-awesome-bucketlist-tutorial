import {ListItem} from "./ListItem";

export interface List {
  _id?: string;
  title: string;
  description: string;
  category: string;
  items: ListItem[];

}
