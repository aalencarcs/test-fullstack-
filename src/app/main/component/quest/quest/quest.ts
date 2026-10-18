import {ChangeDetectorRef, Component, DestroyRef, Input, OnInit} from '@angular/core';
import {Book, Consequence, Section, SectionOption} from '../../../model/book-model';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../../../service/book-service';
import {ConsequenceModal} from '../../consequence/consequence-modal/consequence-modal';
import {UserProgressService} from '../../../service/user-progress-service';
import {UserProgress} from '../../../model/user-progress';
import {forkJoin} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  imports: [ConsequenceModal],
  standalone:true,
  selector: 'app-quest',
  styleUrl: './quest.css',
  templateUrl: './quest.html',
})
export class Quest implements OnInit {

  protected USER_HEALTH = 10;
  book?: Book;
  currentSection?: Section;
  showEndModal = false;
  showConsequenceModal = false;
  selectedConsequence?: Consequence;
  private pendingEndModal = false;
  private userProgress?: UserProgress;
  protected endModalText = '';
  healthText: string =
    this.selectedConsequence?.type === 'LOSE_HEALTH'
      ? "Lost Health"
      : "Gain Health";

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router,
    private userProgressService: UserProgressService,
    private cdr: ChangeDetectorRef,
    private destroyRef: DestroyRef
  ) {}


  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    forkJoin({
      book: this.bookService.getBookById(id),
      progress: this.userProgressService.getUserProgress(id),
    }).subscribe(({ book, progress }) => {
      this.book = book;
      if (progress) {
        this.userProgress = progress
      }

      this.defineFirstSection();
      this.cdr.detectChanges();
    });
  }

  defineFirstSection(): void {
    if (!this.book?.sections?.length) return;

    const savedSectionId = this.userProgress?.sectionId;
    const sectionFromProgress = savedSectionId != null
      ? this.book.sections.find((section) => section.id === savedSectionId)
      : undefined;

    this.currentSection =
      sectionFromProgress ??
      this.book.sections.find((section) => section.type === 'BEGIN');

    if (this.userProgress) {
      this.USER_HEALTH = this.userProgress.health;
    }

    this.updateEndModalState();
  }

  gotoNewSection(gotoId: number): void {
    this.currentSection = this.book?.sections.find(section => section.id === gotoId);
    this.updateEndModalState();
  }

  closeEndModal(): void {
    this.showEndModal = false;
    const defaultProgress = this.buildDefaultProgress();
    this.userProgressService.saveProgress(defaultProgress)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
     saved => {
        this.userProgress = saved;
        this.router.navigate(['/homepage']);
        this.cdr.detectChanges();
    });
  }

  onBackToTheLibrary(){
    this.router.navigate(['/homepage']);
  }

  isCurrentSectionEnded(): boolean {
    return this.currentSection?.type === 'END' || this.USER_HEALTH <= 0;
  }

  onChoosingOption(option: SectionOption): void {
    this.gotoNewSection(option.gotoId);

    if (!option.consequence) {
      this.updateEndModalState();
      return;
    }

    if (option.consequence.type === 'LOSE_HEALTH' && this.USER_HEALTH <= 0) {
      this.updateEndModalState();
      return;
    }

    this.selectedConsequence = option.consequence;
    this.defineUserHealth();
    this.showConsequenceModal = true;
    this.pendingEndModal = this.USER_HEALTH <= 0 || this.currentSection?.type === 'END';
    this.showEndModal = false;
  }

  closeConsequenceModal(): void {
    this.showConsequenceModal = false;
    this.selectedConsequence = undefined;

    if (this.pendingEndModal) {
      this.updateEndModalState();
      this.pendingEndModal = false;
    }
  }


  saveProgress(): void {
    const userProgress: UserProgress = {
      id: undefined,
      bookId: this.book?.id ?? 0,
      sectionId: this.currentSection?.id ?? 0,
      health: this.USER_HEALTH,
    };

    this.userProgressService.saveProgress(userProgress)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
      saved =>this.userProgress = saved);
  }

  getOptionHint(option: SectionOption): string | null {
    if (!option.consequence) {
      return null;
    }

    return option.consequence.type === 'LOSE_HEALTH'
      ? 'This choice may cost you health'
      : 'This choice may restore some health';
  }

  private buildDefaultProgress(): UserProgress {
    const beginSectionId =
      this.book?.sections.find((section) => section.type === 'BEGIN')?.id ?? 0;

    return {
      id: this.userProgress?.id ?? undefined,
      bookId: this.book?.id ?? 0,
      sectionId: beginSectionId,
      health: 10,
    };
  }

  private defineUserHealth(): void {
    if(!this.selectedConsequence){
      return;
    }

    const consequence = this.selectedConsequence;
    const isLoosingHealth =  consequence.type === 'LOSE_HEALTH';
    const updatedHealth =
      isLoosingHealth
        ? this.USER_HEALTH - consequence.value
        : this.USER_HEALTH + consequence.value;

    this.healthText =
      isLoosingHealth ? 'Lost Health' : 'Gain Health';

    this.USER_HEALTH = Math.min(10, Math.max(0, updatedHealth));
  }

  private updateEndModalState(): void {
    const dead = this.USER_HEALTH <= 0;
    const endedBySection = this.currentSection?.type === 'END';

    this.showEndModal = dead || endedBySection;
    this.endModalText = dead ? 'Game over, you died.' : (this.currentSection?.text ?? '');
  }
}
