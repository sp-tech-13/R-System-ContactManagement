import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-contact',
  templateUrl: './delete-contact.component.html',
  styleUrl: './delete-contact.component.css'
})
export class DeleteContactComponent {
  @Input() contactId?: number;
  @Output() confirmDelete = new EventEmitter<number>();

  confirm() {
    if (this.contactId != null) {
      this.confirmDelete.emit(this.contactId);
    }
  }
}
