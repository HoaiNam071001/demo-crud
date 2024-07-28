import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/_models';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../shared/_services/product.service';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss',
})
export class ProductEditComponent implements OnInit {
  productId!: number;
  product!: Product;

  form!: UntypedFormGroup;
  subscription!: Subscription;
  loading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = +(params.get('id') || 0);
      this.onSearch();
    });
    this.createFrom();
  }

  onSearch() {
    if (!this.productId) {
      return;
    }
    this.productService.getById(this.productId).subscribe(
      (product) => {
        this.product = product;
        this.createFrom();
      },
      (error) => {
        this.router.navigate([`/not-found`]);
      }
    );
  }

  createFrom() {
    this.form = this.fb.group({
      name: [this.product?.name, [Validators.required]],
      description: [this.product?.description, [Validators.required]],
      price: [this.product?.price, [Validators.required]],
      imageUrl: [this.product?.imageUrl, [Validators.required]],
      quantity: [
        this.product?.quantity,
        [Validators.required, Validators.min(1)],
      ],
      thumnail: [this.product?.thumnail, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAsTouched();
      return;
    }

    if (this.productId) {
      this.onUpdate();
    } else {
      this.onCreate();
    }
  }

  onCreate() {
    const formValue = this.form.getRawValue();
    this.loading = true;
    this.subscription?.unsubscribe();
    this.subscription = this.productService.post(formValue).subscribe(
      (res) => {
        this.loading = false;

        this.router.navigate([`/product${res.id}`]);
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  onUpdate() {
    const formValue = this.form.getRawValue();
    this.loading = true;
    this.subscription?.unsubscribe();
    this.subscription = this.productService
      .put(this.productId, formValue)
      .subscribe(
        (res) => {
          this.loading = false;
          this.router.navigate([`/product${res.id}`]);
        },
        (error) => {
          this.loading = false;
        }
      );
  }
}
