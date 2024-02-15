import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetImagesComponent } from './get-images.component';

describe('GetImagesComponent', () => {
  let component: GetImagesComponent;
  let fixture: ComponentFixture<GetImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetImagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
