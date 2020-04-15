import { Class } from '../../types/utils';
import { RelationWithEntity, RelationJoinColumn } from '../../types/decorators';
export declare const OneToOne: <T extends Class>(withEntity: RelationWithEntity<T>, withField: keyof InstanceType<T>, joinColumn?: RelationJoinColumn) => ({ constructor: { name: entity } }: any, name: string) => void;
export declare const OneToMany: <T extends Class>(withEntity: RelationWithEntity<T>, withField: keyof InstanceType<T>) => ({ constructor: { name: entity } }: any, name: string) => void;
export declare const ManyToOne: <T extends Class>(withEntity: RelationWithEntity<T>, withField: keyof InstanceType<T>, joinColumn?: RelationJoinColumn) => ({ constructor: { name: entity } }: any, name: string) => void;
export declare const ManyToMany: <T extends Class>(withEntity: RelationWithEntity<T>, withField: keyof InstanceType<T>, joinTable?: RelationJoinColumn) => ({ constructor: { name: entity } }: any, name: string) => void;
