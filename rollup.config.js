import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import resolve from "@rollup/plugin-node-resolve";

export default [
    {
        input: "./src/index.ts",
        output: {
            file: "index.cjs",
            format: "cjs"
        },
        plugins: [
            resolve({
                extensions: [".js", ".ts"]
            }),
            typescript({ target: "ES6" })
        ]
    },
    {
        input: "./src/index.ts",
        output: {
            file: "index.mjs",
            format: "es"
        },
        plugins: [
            resolve({
                extensions: [".js", ".ts"]
            }),
            typescript({ target: "ES2020" })
        ]
    },
    {
        input: "./src/index.ts",
        output: {
            file: "index.d.ts",
            format: "cjs"
        },
        plugins: [
            resolve({
                extensions: [".js", ".ts"]
            }),
            typescript(),
            dts()
        ]
    }
];
