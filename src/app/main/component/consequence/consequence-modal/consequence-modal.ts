import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  imports: [],
  standalone: true,
  selector: 'app-consequence-modal',
  styleUrl: './consequence-modal.css',
  templateUrl: './consequence-modal.html',
})
export class ConsequenceModal {

  @Input() title = '';
  @Input() text = '';
  @Input() secondaryText?: string;
  @Input() buttonText = 'Continue';
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
}
