export interface Pageable {
  _page: number;
  _per_page: number;
  _sort?: string;
  _order?: string;
}

export interface PageInfo {
  first: number;
  last: number;
  items: number;
  next: number;
  pages: number;
  prev: number;
}

export interface List<T> extends PageInfo {
  data : T[];
}
