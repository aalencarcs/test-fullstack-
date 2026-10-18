import {UserProgress, UserProgressRequest, UserProgressResponse} from "../model/user-progress";

export class UserProgressAdapter{

  adapt(item: UserProgressResponse | null): UserProgress | undefined {
    if (!item) return undefined;

    return {
      id: item.id,
      bookId: item.bookId,
      health: item.health,
      sectionId: item.sectionId
    };
  }


  adaptModel(model: UserProgress): UserProgressResponse {
    return {
      id: model.id || 0,
      bookId: model.bookId,
      health: model.health,
      sectionId: model.sectionId,
    };
  }

  adaptRequest(userProgress: UserProgress): UserProgressRequest{
    return {
      bookId: userProgress.bookId,
      health: userProgress.health,
      sectionId: userProgress.sectionId,
    }
  }
}
