import { HttpError } from "@kubernetes/client-node";
import yargs from "yargs";
import { loadConfig } from "./config";
import { initDatabase } from "./database";
import { DeploymentManager } from "./deployment";

const handleError = (error: Error) => {
    if (error instanceof HttpError)
        console.info(
            `Body: ${JSON.stringify(error.body)};\n Status: ${
                error.statusCode
            };\n ${error.stack}`
        );
    else console.info(error);
    process.exit(1);
};

const main = async () => {
    const config = await loadConfig();
    await initDatabase(config.database);
    const cli = yargs(process.argv.slice(2))
        .scriptName("fdpl")
        .completion()
        .command("deploy", "Deploy an application", () =>
            new DeploymentManager(config)
                .deploy()
                .catch((err) => handleError(err))
        )
        .option("help", { alias: "h", boolean: true });
    const argv = cli.parse();
    if (argv.help) {
        cli.showHelp();
        process.exit(0);
    }
};

main().catch((e) => console.error(e));
