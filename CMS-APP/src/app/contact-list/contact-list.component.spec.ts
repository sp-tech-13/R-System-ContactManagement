import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListComponent } from './contact-list.component';
import { Contact } from '../models/contact.model';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('onDelete', () => {
    it('should emit deleteRequest when confirmed', () => {
      spyOn(window, 'confirm').and.returnValue(true); 
      spyOn(component.deleteRequest, 'emit');

      const id = 123;
      component.onDelete(id);

      expect(window.confirm).toHaveBeenCalledWith(
        'Are sure you want to delete this Contact ?'
      );
      expect(component.deleteRequest.emit).toHaveBeenCalledWith(id);
    });

    it('should not emit deleteRequest when cancelled', () => {
      spyOn(window, 'confirm').and.returnValue(false);
      spyOn(component.deleteRequest, 'emit');

      const id = 123;
      component.onDelete(id);

      expect(window.confirm).toHaveBeenCalledWith(
        'Are sure you want to delete this Contact ?'
      );
      expect(component.deleteRequest.emit).not.toHaveBeenCalled();
    });
  });

  describe('onEdit', () => {
    it('should emit editRequest with the provided contact', () => {
      spyOn(component.editRequest, 'emit');

      const contact: Contact = { id: 1, firstName: 'Sanjay', lastName: 'Patel', email: 'sanjay.patel@gmail.com' }; // Example contact.
      component.onEdit(contact);

      expect(component.editRequest.emit).toHaveBeenCalledWith(contact);
    });
  });
});
