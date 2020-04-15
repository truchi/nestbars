import { Config } from '../types/Config';
import { UserConfig } from '../types/UserConfig';
export declare const sanitizeConfig: (userConfig: UserConfig, userRootPath: string, nestbarsTemplatesPath: string, userSrcPath: string) => Promise<Config>;
