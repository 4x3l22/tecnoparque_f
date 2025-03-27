import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoingComponent } from './loing.component';

describe('LoingComponent', () => {
  let component: LoingComponent;
  let fixture: ComponentFixture<LoingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
