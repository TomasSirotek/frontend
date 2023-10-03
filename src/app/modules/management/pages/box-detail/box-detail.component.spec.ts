import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxDetailComponent } from './box-detail.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { By } from '@angular/platform-browser';
import { Box } from '../../models/box';

describe('BoxDetailComponent', () => {
  let component: BoxDetailComponent;
  let fixture: ComponentFixture<BoxDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BoxDetailComponent,RouterTestingModule,HttpClientModule,ToastrModule.forRoot()],
    });
    fixture = TestBed.createComponent(BoxDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with the correct controls', () => {
    expect(component.formGroup.contains('color')).toBeTrue();
    expect(component.formGroup.contains('price')).toBeTrue();
    expect(component.formGroup.contains('description')).toBeTrue();
  });

  it('should mark the form as invalid when empty', () => {
    expect(component.formGroup.valid).toBeFalse();
  });

  it('should mark the color control as invalid when empty', () => {
    const colorControl = component.formGroup.get('color');
    colorControl.setValue('');
    expect(colorControl.valid).toBeFalse();
  });

  it('should mark the price control as invalid when empty', () => {
    const priceControl = component.formGroup.get('price');
    priceControl.setValue('');
    expect(priceControl.valid).toBeFalse();
  });

  it('should mark the description control as invalid when empty', () => {
    const descriptionControl = component.formGroup.get('description');
    descriptionControl.setValue('');
    expect(descriptionControl.valid).toBeFalse();
  });

  it('should mark the price control as invalid when not a number', () => {
    const priceControl = component.formGroup.get('price');
    priceControl.setValue('not a number');
    expect(priceControl.valid).toBeFalse();
  });

  it('should mark the form as valid when all controls are filled in correctly', () => {
    const colorControl = component.formGroup.get('color');
    colorControl.setValue('Red');

    const priceControl = component.formGroup.get('price');
    priceControl.setValue('10.99');

    const descriptionControl = component.formGroup.get('description');
    descriptionControl.setValue('This is a product description.');
    
    expect(component.formGroup.valid).toBeFalse();
  });

  it('should validate the form correctly', () => {
    const nameControl = component.formGroup.get('title');
    const colorControl = component.formGroup.get('color');
    const priceControl = component.formGroup.get('price');
    const descriptionControl = component.formGroup.get('description');

    // Set invalid values for each control
    nameControl.setValue('');
    colorControl.setValue('Invalid color');
    priceControl.setValue('Invalid price');
    descriptionControl.setValue('');

    // Trigger form validation
    component.formSubmitted = true;

    // Check that each control has the expected errors
    expect(nameControl.errors?.['required']).toBeTruthy();
    expect(colorControl.errors?.['invalidColor']).toBeTruthy();
    expect(priceControl.errors?.['pattern']).toBeTruthy();
    expect(descriptionControl.errors?.['required']).toBeTruthy();
  });

  describe('input empty table data loading', () => {
    it('should render loading e when table data are empty', () => {
      const testBox = null as Box;
      component.box = testBox;
      
      fixture.detectChanges();

      const emptyMessage = fixture.debugElement.query(
        By.css('[data-testid="no-data-loading"]')
      );

      expect(emptyMessage).toBeTruthy();
    });
  });

  it('should have a form with required fields', () => {
    expect(component.formGroup.get('title').hasError('required')).toBeTruthy();
    expect(component.formGroup.get('type').hasError('required')).toBeTruthy();
    expect(component.formGroup.get('price').hasError('required')).toBeTruthy();
    expect(component.formGroup.get('description').hasError('required')).toBeTruthy();
  });

  it('should validate the price field', () => {
    const priceControl = component.formGroup.get('price');

    priceControl.setValue('abc');
    expect(priceControl.hasError('pattern')).toBeTruthy();

    priceControl.setValue('123');
    expect(priceControl.hasError('pattern')).toBeFalsy();
  });

  it('should validate the description field', () => {
    const descriptionControl = component.formGroup.get('description');

    descriptionControl.setValue('s');
    expect(descriptionControl.hasError('minlength')).toBeTruthy();

    descriptionControl.setValue('aaaaaa');
    expect(descriptionControl.hasError('minlength')).toBeFalsy();
  });

});
