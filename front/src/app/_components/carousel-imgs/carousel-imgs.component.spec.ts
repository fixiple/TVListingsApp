import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselIMGSComponent } from './carousel-imgs.component';

describe('CarouselIMGSComponent', () => {
  let component: CarouselIMGSComponent;
  let fixture: ComponentFixture<CarouselIMGSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselIMGSComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarouselIMGSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
