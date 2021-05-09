import { configSchema } from "./schema/config";

export const loadConfig = async (path = `${process.cwd()}/fdpl.ts`) => {
    const raw = (await import(path)).default;
    return configSchema.parseAsync(raw);
};
