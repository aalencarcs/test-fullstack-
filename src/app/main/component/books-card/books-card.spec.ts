import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BooksCard } from './books-card';

describe('BooksCard', () => {
  let component: BooksCard;
  let fixture: ComponentFixture<BooksCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksCard],
    }).compileComponents();

    fixture = TestBed.createComponent(BooksCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
