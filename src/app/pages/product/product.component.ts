import { Component, OnInit } from '@angular/core';
import { Pageable, PageInfo, Product, SortOption } from '../../shared/_models';
import { ProductService } from '../../shared/_services/product.service';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { SearchInputComponent } from '../../shared/_components/search-input/search-input.component';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { RangeComponent } from '../../shared/_components/range/range.component';
import {MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    SearchInputComponent,
    ReactiveFormsModule,
    RangeComponent,
    MatPaginatorModule,
    RouterModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  title = 'angular-demo';

  pageable: Pageable = {
    _page: 1,
    _per_page: 10,
  };
  products: Product[] = [];
  sortOption!: SortOption;
  sortOptions: SortOption[] = [
    { sort: 'name', viewValue: 'Tên' },
    { sort: 'price', viewValue: 'Giá' },
  ];
  pageInfo!: PageInfo;
  request: { [key: string]: string | number } = {};
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.onSearch();
  }

  onSort(option: SortOption) {
    this.pageable._sort = option.sort;
    this.sortOption = option;
    this.setPage(1);
  }

  onSearch() {
    this.productService
      .get(this.pageable, this.request)
      .subscribe((product) => {
        this.products = product.data;
        this.pageInfo = product;
      });
  }

  onNavigate(product: Product): void {
    this.router.navigate([`/product/${product.id}`]);
  }

  onSearchText(keyword: string) {
    if (this.request['name'] == keyword) {
      return;
    }
    this.request['name'] = keyword;
    this.setPage(1);
  }

  onChangeFilter(value: number) {
    this.request['price_lte'] = value;
    this.setPage(1);
  }

  onPage(event:any) {
    this.setPage(event.pageIndex + 1);
  }

  setPage(number: number) {
    this.pageable._page = number;
    this.onSearch();
  }
}
