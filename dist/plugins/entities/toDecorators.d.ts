import { Field } from '../../lib/data/Field';
declare type Decorators = {
    dbDecorator: string;
    gqlDecorator: string;
};
declare const _default: ({ type }: Field) => Decorators;
export default _default;
