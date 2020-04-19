export class Data {
  data: { [key: string]: any } = {}

  set(name: string, data: any): void {
    this.data[name] = data
  }

  get(name: string): any {
    return this.data[name]
  }

  empty(): void {
    this.data = {}
  }
}
