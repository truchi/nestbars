// import { FieldOptions, FieldType, Class } from '../types'
// import { addField } from './data'

// // Field decorator factory
// export const Id = (type: 'id', args: FieldOptions = {}) =>
//   // Field decorator
//   (prototype: any, field: string) =>
//     addField(prototype.constructor.name, field, Object.assign({ type }, args))

// // Field decorator factory
// export const Field = (type: FieldType, args: FieldOptions = {}) =>
//   // Field decorator
//   (prototype: any, field: string) =>
//     addField(prototype.constructor.name, field, Object.assign({ type }, args))

// // One-to-Many decorator factory
// export const OneToMany = <Many extends Class>(
//   many: Many,
//   toOne: keyof InstanceType<Many>,
// ) =>
//   // One-to-Many decorator
//   ({ constructor }, field: string) =>
//     console.log(constructor.name, field, many, toOne)

// // Many-to-One decorator factory
// export const ManyToOne = <One extends Class>(
//   //
//   one: One,
//   toMany: keyof InstanceType<One>,
// ) =>
//   // One-to-Many decorator
//   ({ constructor }, field: string) =>
//     console.log(constructor.name, field, one, toMany)
