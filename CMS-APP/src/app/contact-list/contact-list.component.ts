import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {
  @Input() contacts: Contact[] = [];
  @Output() deleteRequest = new EventEmitter<number>();
  @Output() editRequest = new EventEmitter<Contact>();

  onDelete(id: number) {
    if(window.confirm('Are sure you want to delete this Contact ?')){
      this.deleteRequest.emit(id);   
    }
  }

  onEdit(contact: Contact) {
    this.editRequest.emit(contact);
  }

}
