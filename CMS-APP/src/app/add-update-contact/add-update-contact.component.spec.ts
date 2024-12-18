import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateContactComponent  } from './add-update-contact.component';

describe('AddContactComponent', () => {
  let component: AddUpdateContactComponent;
  let fixture: ComponentFixture<AddUpdateContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUpdateContactComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
