import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-bookstore-tag',
  standalone: true,
  templateUrl: './bookstore-tag.html',
  styleUrl: './bookstore-tag.css',
})
export class BookstoreTag {
  @Input() values: string[] = [];
  @Input() clickable = false;
  @Input() tone = '#eebd5d';
  @Input() selectedTone = '#dbeafe';

  @Output() selectionChange = new EventEmitter<string[]>();

  protected selectedValues: string[] = [];

  protected onTagClick(value: string): void {
    if (!this.clickable) {
      return;
    }

    const alreadySelected = this.selectedValues.includes(value);
    this.selectedValues = alreadySelected
      ? this.selectedValues.filter((selected) => selected !== value)
      : [...this.selectedValues, value];

    this.selectionChange.emit(this.selectedValues);
  }

  protected isSelected(value: string): boolean {
    return this.selectedValues.includes(value);
  }
}
