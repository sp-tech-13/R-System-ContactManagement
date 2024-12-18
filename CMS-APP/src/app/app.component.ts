import { Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';
import { Contact } from './models/contact.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'CMS-APP';
  isToggled: boolean = false;
  contacts: Contact[] = [];
  isModified: boolean = false;
  contact?: Contact;

  constructor(private contactService: ContactService) {
    this.contactService.contacts$.subscribe(contacts => this.contacts = contacts);
  }

  ngOnInit(): void {
    this.loadContacts();
  }
  addContact($event: any) {
    this.isModified = false;
    this.HideContact(false);
    this.loadContacts();
  }
  
  toggleVariable(): void {
    this.isToggled = !this.isToggled;
  }


  deleteContact(id: number) {
    this.contactService.deleteContact(id);
    this.loadContacts();
  }

  editContact(contact: Contact) {
    this.isModified = true;
    this.contact = contact;
    this.isToggled = true;
  }

  HideContact($event: boolean) {
    this.isToggled = $event;
  }

  private loadContacts(): void {
    this.contactService.getAllContacts();
  }
}
