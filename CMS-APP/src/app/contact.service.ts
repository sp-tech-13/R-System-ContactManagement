import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Contact } from './models/contact.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:5183/api/contacts'; // Example API URL

  private contacts = new BehaviorSubject<Contact[]>([]);
  public contacts$ = this.contacts.asObservable();

  addContact(contact: Contact) {
    this.http.post<Contact>(`${this.apiUrl}`, contact).subscribe({
      next: (response) => {
        this.getAllContacts();
      },
      error: (error) => {
        console.error('Error in contact insertion:', error);
      },
    });
  }

  updateContact(contact: Contact, id?: number) {
    const currentContacts = this.contacts.getValue();
    const url = `${this.apiUrl}/${id}`;
    contact.id = id;
    this.http.put<Contact>(`${url}`, contact).subscribe({
      next: (response) => {
        this.getAllContacts();
      },
      error: (error) => {
        console.error('Error in contact insertion:', error);
      },
    });
  }


  deleteContact(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url).subscribe({
      next: (response: any) => {
        const updatedContacts = this.contacts.getValue().filter(c => c.id !== id);
        this.contacts.next(updatedContacts);
      },
      error: (error) => {
        console.error("Error in delete contact:", error);
      }
    });
  }

  getAllContacts(): void {

    this.http.get<Contact[]>(`${this.apiUrl}`).subscribe({
      next: (response) => {
        this.contacts.next(response); // Update the BehaviorSubject with the API response
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
    });
  }
}
