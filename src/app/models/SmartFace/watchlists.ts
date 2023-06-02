import { Items } from "./items";

export class WatchLists{

  totalItemsCount = null;
  items = new Array<Items>();
  pageSize!: number;
  pageNumber!:number;
  previousPage = null;
  nextPage = null;

}
