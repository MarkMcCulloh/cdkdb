export class DBType {
  constructor(public readonly type: string, public readonly size?: number) {}

  render() {
    return this.size ? `${this.type}(${this.size})` : this.type;
  }
}
