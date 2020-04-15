export type Class = new (...args: any[]) => any

// TODO `type` type (eg: 'entity' | 'service' | ...)
export type PathFunction = (name?: string, type?: string) => string
