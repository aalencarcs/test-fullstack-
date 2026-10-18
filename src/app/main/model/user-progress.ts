
export interface UserProgress {
  id: number | undefined;
  bookId: number;
  health: number;
  sectionId: number
}

export interface UserProgressResponse {
  id: number;
  bookId: number;
  health: number;
  sectionId: number
}

export interface UserProgressRequest{
  bookId: number;
  health: number;
  sectionId: number
}

