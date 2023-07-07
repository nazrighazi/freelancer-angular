import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerModalComponent } from './freelancer-modal.component';

describe('FreelancerModalComponent', () => {
  let component: FreelancerModalComponent;
  let fixture: ComponentFixture<FreelancerModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FreelancerModalComponent]
    });
    fixture = TestBed.createComponent(FreelancerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
