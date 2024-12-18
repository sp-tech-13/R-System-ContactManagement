import { TestBed } from '@angular/core/testing';
import { ContactService } from './contact.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Contact } from './models/contact.model';

describe('ContactService', () => {
  let service: ContactService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContactService],
    });

    service = TestBed.inject(ContactService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getAllContacts', () => {
    it('should fetch all contacts and update the BehaviorSubject', () => {
      const mockContacts: Contact[] = [
        {
          id: 1,
          firstName: 'Sanjay',
          lastName: 'Patel',
          email: 'sanjay@gmail.com',
        },
        {
          id: 2,
          firstName: 'Kalpesh',
          lastName: 'Soni',
          email: 'kalpesh@gmail.com',
        },
      ];

      service.getAllContacts();

      const req = httpMock.expectOne(`${service['apiUrl']}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockContacts);

      service.contacts$.subscribe((contacts) => {
        expect(contacts).toEqual(mockContacts);
      });
    });

    it('should log an error if the request fails', () => {
      spyOn(console, 'error');

      service.getAllContacts();

      const req = httpMock.expectOne(`${service['apiUrl']}`);
      req.flush('Error fetching data', {
        status: 500,
        statusText: 'Server Error',
      });

      expect(console.error).toHaveBeenCalledWith(
        'Error fetching data:',
        jasmine.anything()
      );
    });
  });

  describe('#addContact', () => {
    it('should send POST request and refresh contacts', () => {
      const newContact: Contact = {
        id: 3,
        firstName: 'demo',
        lastName: 'testing',
        email: 'alice@example.com',
      };

      spyOn(service, 'getAllContacts');

      service.addContact(newContact);

      const req = httpMock.expectOne(`${service['apiUrl']}`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newContact);

      req.flush(newContact);
      expect(service.getAllContacts).toHaveBeenCalled();
    });

    it('should log an error if the POST request fails', () => {
      const newContact: Contact = {
        id: 3,
        firstName: 'demo',
        lastName: 'testing',
        email: 'alice@example.com',
      };
      spyOn(console, 'error');

      service.addContact(newContact);

      const req = httpMock.expectOne(`${service['apiUrl']}`);
      req.flush('Error adding contact', {
        status: 400,
        statusText: 'Bad Request',
      });

      expect(console.error).toHaveBeenCalledWith(
        'Error in contact insertion:',
        jasmine.anything()
      );
    });
  });

  describe('#updateContact', () => {
    it('should send PUT request and refresh contacts', () => {
      const updatedContact: Contact = {
        id: 1,
        firstName: 'demo1',
        lastName: 'testing1',
        email: 'updated@example.com',
      };

      spyOn(service, 'getAllContacts');

      service.updateContact(updatedContact, updatedContact.id);

      const req = httpMock.expectOne(
        `${service['apiUrl']}/${updatedContact.id}`
      );
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updatedContact);

      req.flush(updatedContact);
      expect(service.getAllContacts).toHaveBeenCalled();
    });

    it('should log an error if the PUT request fails', () => {
      const updatedContact: Contact = {
        id: 1,
        firstName: 'demo1',
        lastName: 'testing1',
        email: 'updated@example.com',
      };

      spyOn(console, 'error');

      service.updateContact(updatedContact, updatedContact.id);

      const req = httpMock.expectOne(
        `${service['apiUrl']}/${updatedContact.id}`
      );
      req.flush('Error updating contact', {
        status: 400,
        statusText: 'Bad Request',
      });

      expect(console.error).toHaveBeenCalledWith(
        'Error in contact insertion:',
        jasmine.anything()
      );
    });
  });

  describe('#deleteContact', () => {
    it('should send DELETE request and update the BehaviorSubject', () => {
      const contactId = 2;
      const mockContacts: Contact[] = [
        {
          id: 1,
          firstName: 'Sanjay',
          lastName: 'Patel',
          email: 'sanjay@gmail.com',
        },
        {
          id: 2,
          firstName: 'Kalpesh',
          lastName: 'Soni',
          email: 'kalpesh@gmail.com',
        },
      ];

      // Preload the current contacts into the BehaviorSubject
      service['contacts'].next(mockContacts);

      service.deleteContact(contactId);

      const req = httpMock.expectOne(`${service['apiUrl']}/${contactId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush({}); // No body required for DELETE response

      service.contacts$.subscribe((contacts) => {
        const filteredContacts = mockContacts.filter((c) => c.id !== contactId);
        expect(contacts).toEqual(filteredContacts);
      });
    });

    it('should log an error if the DELETE request fails', () => {
      const contactId = 2;

      spyOn(console, 'error');

      service.deleteContact(contactId);

      const req = httpMock.expectOne(`${service['apiUrl']}/${contactId}`);
      req.flush('Error deleting contact', {
        status: 500,
        statusText: 'Server Error',
      });

      expect(console.error).toHaveBeenCalledWith(
        'Error in delete contact:',
        jasmine.anything()
      );
    });
  });
});
