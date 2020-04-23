import { Nestbars } from './types/nestbars';
export * from './lib/decorators';
export { default as entities } from './plugins/entities';
export { default as resolvers } from './plugins/resolvers';
export { default as services } from './plugins/services';
export { default as dtos } from './plugins/dtos';
declare const nestbars: Nestbars;
export default nestbars;
