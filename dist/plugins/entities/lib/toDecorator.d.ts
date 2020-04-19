import { FieldType } from '../../../types/decorators';
declare type Decorator = {
    dbDecorator: string;
    gqlDecorator: string;
};
declare const _default: (type: FieldType) => Decorator;
export default _default;
