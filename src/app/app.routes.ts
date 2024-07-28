import { Routes } from '@angular/router';
import { ProductComponent } from './pages/product/product.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductEditComponent } from './pages/product-edit/product-edit.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'product',
    children: [
      {
        path: 'create',
        component: ProductEditComponent,
      },
      {
        path: ':id',
        component: ProductDetailComponent,
      },
      {
        path: ':id/edit',
        component: ProductEditComponent,
      },
      {
        path: '',
        component: ProductComponent,
      },
    ]
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'product',
  },
];
