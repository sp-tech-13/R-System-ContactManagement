import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateContactComponent  } from './add-update-contact.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../contact.service';
import { of } from 'rxjs';

describe('AddContactComponent', () => {
  let component: AddUpdateContactComponent;
  let fixture: ComponentFixture<AddUpdateContactComponent>;
  let contactServiceMock: any;

  beforeEach(async () => {
    contactServiceMock = jasmine.createSpyObj('ContactService', [
      'addContact',
      'updateContact',
    ]);

    await TestBed.configureTestingModule({
      declarations: [AddUpdateContactComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: ContactService, useValue: contactServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddUpdateContactComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize the form with contact data if isModified is true', () => {
      component.isModified = true;
      component.contact = {
        id: 1,
        firstName: 'Sanjay',
        lastName: 'Patel',
        email: 'sanjay.patel@gmail.com',
      };

      component.ngOnInit();

      expect(component.action).toBe('Update');
      expect(component.contactForm.value).toEqual({
        firstName: 'sanjay',
        lastName: 'patel',
        email: 'snajay.patel@gmail.com',
      });
    });

    it('should not patch the form if isModified is false', () => {
      component.isModified = false;

      component.ngOnInit();

      expect(component.action).toBe('Add');
      expect(component.contactForm.value).toEqual({
        firstName: '',
        lastName: '',
        email: '',
      });
    });
  });

  describe('onSubmit', () => {
    it('should call addContact when isModified is false and emit contactAdded', () => {
      spyOn(component.contactAdded, 'emit');
      component.isModified = false;
      component.contactForm.setValue({
        firstName: 'sanjay',
        lastName: 'patel',
        email: 'sanjay.patel@gmail.com',
      });

      contactServiceMock.addContact.and.returnValue(of({}));

      component.onSubmit();

      expect(contactServiceMock.addContact).toHaveBeenCalledWith({
        firstName: 'sanjay',
        lastName: 'patel',
        email: 'sanjay.patel@gmail.com',
      });
      expect(component.contactAdded.emit).toHaveBeenCalledWith({
        firstName: 'sanjay',
        lastName: 'patel',
        email: 'sanjay.patel@gmail.com',
      });
      expect(component.contactForm.valid).toBeTrue();
    });

    it('should call updateContact when isModified is true and emit contactAdded', () => {
      spyOn(component.contactAdded, 'emit');
      component.isModified = true;
      component.contact = { id: 1, firstName: '', lastName: '', email: '' };
      component.contactForm.setValue({
        firstName: 'sanjay',
        lastName: 'patel',
        email: 'sanjay.patel@gmail.com',
      });

      contactServiceMock.updateContact.and.returnValue(of({}));

      component.onSubmit();

      expect(contactServiceMock.updateContact).toHaveBeenCalledWith(
        { firstName: 'Sanjay', lastName: 'Patel', email: 'sanjay.patel@gmail.com' },
        1
      );
      expect(component.contactAdded.emit).toHaveBeenCalledWith({
        firstName: 'sanjay',
        lastName: 'patel',
        email: 'sanjay.patel@gmail.com',
      });
    });

    it('should not emit contactAdded if the form is invalid', () => {
      spyOn(component.contactAdded, 'emit');
      component.isModified = false;
      component.contactForm.setValue({
        firstName: '',
        lastName: '',
        email: '',
      });

      component.onSubmit();

      expect(contactServiceMock.addContact).not.toHaveBeenCalled();
      expect(component.contactAdded.emit).not.toHaveBeenCalled();
    });
  });

  describe('Cancel', () => {
    it('should emit contactCancel with false', () => {
      spyOn(component.contactCancel, 'emit');

      component.Cancel();

      expect(component.contactCancel.emit).toHaveBeenCalledWith(false);
    });
  });
});
