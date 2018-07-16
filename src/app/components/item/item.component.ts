import { Item } from './../../models/item.model';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: 'item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  @Input() item: Item;
  @Input() user;

  @Output() delete = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() toggleDone = new EventEmitter<any>();

  onDelete() {
    this.delete.emit();
  }

  onEdit() {
    this.edit.emit();
  }

  onToggleDone() {
    this.toggleDone.emit();
  }
}
