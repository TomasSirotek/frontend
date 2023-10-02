import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiHeaderComponent } from './ai-header.component';

describe('AiHeaderComponent', () => {
  let component: AiHeaderComponent;
  let fixture: ComponentFixture<AiHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AiHeaderComponent]
    });
    fixture = TestBed.createComponent(AiHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
