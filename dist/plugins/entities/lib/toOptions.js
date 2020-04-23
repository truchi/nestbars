"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../../types/decorators");
const utils_1 = require("../../../lib/utils");
exports.default = ({ options }, type) => ({
    dbOptions: (() => {
        if (options instanceof decorators_1.ScalarOptions) {
            return Object.assign({ type }, utils_1.rename(utils_1.pick(options, [
                'primary',
                'unique',
                'nullable',
                'default',
                'description',
            ]), { description: 'comment' }), options.options);
        }
        else if (options instanceof decorators_1.PrimaryOptions) {
            return Object.assign({ type }, utils_1.rename(utils_1.pick(options, ['description']), { description: 'comment' }), options.options);
        }
        else if (options instanceof decorators_1.SpecialOptions) {
            return Object.assign({ type }, utils_1.rename(utils_1.pick(options, ['primary', 'description']), {
                description: 'comment',
            }), options.options);
        }
        else if (options instanceof decorators_1.SetOptions) {
            return Object.assign({ type }, utils_1.rename(utils_1.pick(options, ['name', 'primary', 'default', 'description']), {
                name: 'enum',
                description: 'comment',
            }), options.options);
        }
        else if (options instanceof decorators_1.RelationOptions) {
            return {};
        }
        else {
            utils_1.assertNever(options, __filename, 'gqlOptions');
        }
    })(),
    gqlOptions: (() => {
        if (options instanceof decorators_1.ScalarOptions) {
            return utils_1.rename(utils_1.pick(options, ['nullable', 'default', 'description', 'deprecation']), {
                default: 'defaultValue',
                deprecation: 'deprecationReason',
            });
        }
        else if (options instanceof decorators_1.PrimaryOptions ||
            options instanceof decorators_1.SpecialOptions) {
            return utils_1.rename(utils_1.pick(options, ['description', 'deprecation']), {
                deprecation: 'deprecationReason',
            });
        }
        else if (options instanceof decorators_1.SetOptions) {
            return utils_1.rename(utils_1.pick(options, ['default', 'description', 'deprecation']), {
                default: 'defaultValue',
                deprecation: 'deprecationReason',
            });
        }
        else if (options instanceof decorators_1.RelationOptions) {
            return {};
        }
        else {
            utils_1.assertNever(options, __filename, 'gqlOptions');
        }
    })(),
});
//# sourceMappingURL=toOptions.js.map