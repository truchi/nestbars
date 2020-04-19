import { FieldType } from '../../../types/decorators';
declare type Decorators = {
    dbDecorator: string;
    gqlDecorator: string;
};
declare const _default: (type: FieldType) => Decorators;
export default _default;
