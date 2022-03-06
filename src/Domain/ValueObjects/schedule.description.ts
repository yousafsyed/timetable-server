export class ScheduleDescription {
  private description: string;
  constructor(description: string) {
    this.validate(description);
    this.description = description;
  }

  private validate(description: string) {
    if (!description) {
      throw new Error('Description cannot be empty');
    }
  }

  public value(): string {
    return this.description;
  }
}
