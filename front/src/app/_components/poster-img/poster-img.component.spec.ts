import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosterIMGComponent } from './poster-img.component';

describe('PosterIMGComponent', () => {
  let component: PosterIMGComponent;
  let fixture: ComponentFixture<PosterIMGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PosterIMGComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PosterIMGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
