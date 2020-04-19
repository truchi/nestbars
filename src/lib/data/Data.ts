const name = (keys: string[]): string => keys.join(':')

export class Data {
  data: { [key: string]: any } = {}

  set(data: any, ...keys: string[]): void {
    this.data[name(keys)] = data
  }

  get(...keys: string[]): any {
    return this.data[name(keys)]
  }

  empty(): void {
    this.data = {}
  }
}
