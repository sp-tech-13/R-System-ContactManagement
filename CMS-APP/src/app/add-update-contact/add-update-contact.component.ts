import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../contact.service';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-add-update-contact',
  templateUrl: './add-update-contact.component.html',
  styleUrl: './add-update-contact.component.css'
})
export class AddUpdateContactComponent implements OnInit {
  @Input() isModified: boolean = false; 
  @Input() contact!: Contact;
  @Output() contactAdded = new EventEmitter<Contact>();
  @Output() contactCancel = new EventEmitter<boolean>();

  contactForm: FormGroup<any>;
  action: string = 'Add';
  
  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    if(this.isModified) {
      this.action = "Update";
      this.contactForm.patchValue({
        firstName: this.contact?.firstName,
        lastName: this.contact?.lastName,
        email: this.contact?.email,
      });
    }
  }

  onSubmit() {
    
    if (this.contactForm.valid) {

      let contactObj: Contact = { 
        ...this.contactForm.value 
      };

      if(this.isModified) {
        this.contactService.updateContact(contactObj, this.contact!.id);
      } else {
        this.contactService.addContact(contactObj);
      }

      this.contactForm.reset();
      this.contactAdded.emit(contactObj);
    }
  }

  Cancel(): void {
    this.contactCancel.emit(false);
  }
}
