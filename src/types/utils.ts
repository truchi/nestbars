export type Class = new (...args: any[]) => any

export type PathFunction = (name?: string, type?: string) => string

export type ObjectDefinition<T> = RecursiveObject<T> | RecursiveArray<T>

type RecursiveArray<T> = (RecursiveArray<T> | RecursiveObject<T> | T)[]

type RecursiveObject<T> = {
  key: string
  value: RecursiveObject<T> | RecursiveArray<T> | T
}
