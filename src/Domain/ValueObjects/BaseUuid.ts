export abstract class BaseUuid {
  private uuidRegex =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  constructor(private id: string) {
    this.guardAgainstInvalidUuid();
  }

  private guardAgainstInvalidUuid() {
    if (this.uuidRegex.test(this.id)) {
      throw new Error('Invalid UUId');
    }
  }

  public value(): string {
    return this.id;
  }
}
