import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../shared/_services/product.service';
import { Product } from '../../shared/_models';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ConfirmComponent } from '../../shared/_components/confirm/confirm.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {

  productId!: string;
  product!: Product;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private dialog: MatDialog
  ) {

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id') || '';
      this.onSearch();
    });

  }

  onSearch() {
    this.productService.getById(this.productId).subscribe((product) => {
      this.product = product;
    },
    error => {
      this.router.navigate([`/not-found`]);
    }
  );
  }

  onEdit() {
    this.router.navigate([`/product/${this.product.id}/edit`])
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: { animal: 'ok' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.delete(this.productId).subscribe(
          (res) => {
            this.router.navigate([`/product`]);
          },
          (error) => {
          }
        );
      }
    });

  }
}
