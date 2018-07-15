import { Item } from './../../models/item.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: 'item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  @Input() item: Item;

  @Output() delete = new EventEmitter<any>();
  @Output() toggleDone = new EventEmitter<any>();

  onDelete() {
    this.delete.emit();
  }

  onToggleDone() {
    this.toggleDone.emit();
  }
}
