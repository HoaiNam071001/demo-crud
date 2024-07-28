import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-range',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './range.component.html',
  styleUrl: './range.component.scss'
})
export class RangeComponent  implements OnInit {
  @Input() title = 'Price';
  @Input() max = 30000;
  @Output() search = new EventEmitter();

  inputCtrl = new UntypedFormControl(100);

  ngOnInit(): void {
    this.inputCtrl.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      this.search.emit((this.max * value)/100);
    });
  }

  onSetInput(event: any) {
    this.inputCtrl.setValue(event.srcElement?.value);
  }
}
