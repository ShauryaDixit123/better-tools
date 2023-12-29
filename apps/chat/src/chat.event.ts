export class PingEvent {
  constructor(
    public readonly data: {
      message: string;
    }
  ) {}
  toString() {
    return JSON.stringify(this.data);
  }
}
