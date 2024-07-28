import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-search-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent implements OnInit {

  @Output() search = new EventEmitter();

  inputCtrl = new UntypedFormControl();

  ngOnInit(): void {
    this.inputCtrl.valueChanges.pipe(debounceTime(500)).subscribe((e) => {
      this.onSearch(e);
    });
  }

  onSetInput(event: any) {
    this.inputCtrl.setValue(event.srcElement?.value);
  }

  onSearch(value: string) {
    this.search.emit(value);
  }
}
