import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-selectbox',
  templateUrl: './selectbox.component.html',
  styleUrl: './selectbox.component.css',
})
export class SelectboxComponent {
  @Input() options: any;
  selectControl = new FormControl('');

  @Output() valueSelected = new EventEmitter<any>();

  constructor() {}

  onSelectionChange() {
    this.valueSelected.emit(this.selectControl.value);
  }
}
