import * as z from "zod";

export const appSchema = z.object({
    name: z.string(),
    build: z.object({
        namespace: z.string().default("default"),
        image: z.string(),
    }),
    expose: z.array(
        z.object({
            port: z.object({
                from: z.number(),
                to: z.number().optional(),
            }),
            host: z.string(),
        })
    ),
});

export const databaseSchema = z.object({
    type: z
        .union([
            z.literal("postgresql"),
            z.literal("sqlite"),
            z.literal("mysql"),
        ])
        .default("sqlite"),
    uri: z.string().url(),
    debug: z.boolean().default(false),
});

export const configSchema = z.object({
    database: databaseSchema,
    apps: z.array(appSchema).default([]),
});

// Types
export type App = z.infer<typeof appSchema>;
export type DatabaseConfig = z.infer<typeof databaseSchema>;
export type Config = z.infer<typeof configSchema>;
export type InputConfig = z.input<typeof configSchema>;
