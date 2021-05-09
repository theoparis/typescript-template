import { createConnection } from "typeorm";
import { DatabaseConfig } from "./schema/config";

export const initDatabase = (config: DatabaseConfig) =>
    createConnection({
        type: config.type as never,
        synchronize: true,
        logging: config.debug,
        url: config.uri,
    });
