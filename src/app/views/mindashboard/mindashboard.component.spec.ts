import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MindashboardComponent } from './mindashboard.component';

describe('MindashboardComponent', () => {
  let component: MindashboardComponent;
  let fixture: ComponentFixture<MindashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MindashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MindashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
