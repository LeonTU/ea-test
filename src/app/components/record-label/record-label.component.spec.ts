import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordLabelComponent } from './record-label.component';

describe('RecordLabelComponent', () => {
  let component: RecordLabelComponent;
  let fixture: ComponentFixture<RecordLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
