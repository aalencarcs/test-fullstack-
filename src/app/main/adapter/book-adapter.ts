import {
  Book,
  BookResponse,
  Consequence,
  ConsequenceResponse,
  Section,
  SectionOption,
  SectionOptionResponse,
  SectionResponse
} from '../model/book-model';

export class BookAdapter {
  adaptResponse(response: BookResponse): Book {
    return {
      id: response.id,
      title: response.title,
      author: response.author,
      difficulty: response.difficulty,
      sections: response.sections.map((section) => this.adaptSectionResponse(section))
    };
  }

  adaptModel(model: Book): BookResponse {
    return {
      id: model.id,
      title: model.title,
      author: model.author,
      difficulty: model.difficulty,
      sections: model.sections.map((section) => this.adaptSectionModel(section))
    };
  }

  private adaptSectionResponse(section: SectionResponse): Section {
    return {
      id: section.id,
      text: section.text,
      type: section.type,
      options: section.options?.map((option) => this.adaptOptionResponse(option))
    };
  }

  private adaptSectionModel(section: Section): SectionResponse {
    return {
      id: section.id,
      text: section.text,
      type: section.type,
      options: section.options?.map((option) => this.adaptOptionModel(option))
    };
  }

  private adaptOptionResponse(option: SectionOptionResponse): SectionOption {
    return {
      description: option.description,
      gotoId: option.gotoId,
      consequence: option.consequence
        ? this.adaptConsequenceResponse(option.consequence)
        : undefined,
    };
  }

  private adaptOptionModel(option: SectionOption): SectionOptionResponse {
    return {
      description: option.description,
      gotoId: option.gotoId,
      consequence: option.consequence
        ? this.adaptConsequenceModel(option.consequence)
        : undefined,
    };
  }

  private adaptConsequenceResponse(consequence: ConsequenceResponse): Consequence {
    return {
      type: consequence.type,
      value: consequence.value,
      text: consequence.text
    };
  }

  private adaptConsequenceModel(consequence: Consequence): ConsequenceResponse {
    return {
      type: consequence.type,
      value: consequence.value,
      text: consequence.text
    };
  }

}
