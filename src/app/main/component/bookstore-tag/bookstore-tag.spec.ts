import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BookstoreTag} from './bookstore-tag';

describe('BookstoreTag', () => {
  let component: BookstoreTag;
  let fixture: ComponentFixture<BookstoreTag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookstoreTag],
    }).compileComponents();

    fixture = TestBed.createComponent(BookstoreTag);
    component = fixture.componentInstance;
    component.values = ['Fantasy', 'Mystery'];
    fixture.detectChanges();
  });

  it('should render non-clickable tags with tone', () => {
    component.clickable = false;
    component.tone = 'rgb(245, 245, 245)';
    fixture.detectChanges();

    const firstTag = fixture.nativeElement.querySelector('.bookstore-tag') as HTMLButtonElement;
    expect(firstTag).toBeTruthy();
    expect(firstTag.style.backgroundColor).toBe('rgb(245, 245, 245)');
  });

  it('should select and unselect clickable tags and propagate selected array', () => {
    component.clickable = true;
    component.selectedTone = 'rgb(219, 234, 254)';
    fixture.detectChanges();

    const emittedSelections: string[][] = [];
    component.selectionChange.subscribe((values) => emittedSelections.push(values));

    const firstTag = fixture.nativeElement.querySelector('.bookstore-tag') as HTMLButtonElement;
    firstTag.click();
    fixture.detectChanges();

    expect(emittedSelections[0]).toEqual(['Fantasy']);
    expect(firstTag.style.backgroundColor).toBe('rgb(219, 234, 254)');

    firstTag.click();
    fixture.detectChanges();

    expect(emittedSelections[1]).toEqual([]);
  });
});
