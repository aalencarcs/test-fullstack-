import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreHomepage } from './store-homepage';

describe('StoreHomepage', () => {
  let component: StoreHomepage;
  let fixture: ComponentFixture<StoreHomepage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreHomepage],
    }).compileComponents();

    fixture = TestBed.createComponent(StoreHomepage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
