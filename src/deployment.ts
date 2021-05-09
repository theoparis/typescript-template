import { Config } from "./schema/config";
import * as k8s from "@kubernetes/client-node";

export class DeploymentManager {
    appsApi: k8s.AppsV1Api;

    constructor(public readonly config: Config) {
        const kc = new k8s.KubeConfig();
        kc.loadFromDefault();
        this.appsApi = kc.makeApiClient(k8s.AppsV1Api);
    }

    async appExists(namespace: string, appName: string) {
        try {
            const deployment = await this.appsApi.readNamespacedDeployment(
                appName,
                namespace
            );
            return deployment !== null;
        } catch {
            return false;
        }
    }

    async deploy() {
        for await (const app of this.config.apps) {
            console.info(`Deploying ${JSON.stringify(app)}`);
            if (!(await this.appExists(app.build.namespace, app.name)))
                return (
                    await this.appsApi.createNamespacedDeployment(
                        app.build.namespace,
                        {
                            metadata: {
                                labels: {
                                    run: app.name,
                                },
                                name: app.name,
                            },
                            spec: {
                                selector: {
                                    matchLabels: {
                                        run: app.name,
                                    },
                                },
                                template: {
                                    metadata: {
                                        labels: {
                                            run: app.name,
                                        },
                                    },
                                    spec: {
                                        containers: [
                                            {
                                                name: app.name,
                                                image: app.build.image,
                                                ports: app.expose.map((e) => ({
                                                    containerPort: e.port.from,
                                                    hostPort: e.port.to,
                                                })),
                                            },
                                        ],
                                    },
                                },
                            },
                        }
                    )
                ).body;
            else
                return (
                    await this.appsApi.replaceNamespacedDeployment(
                        app.name,
                        app.build.namespace,
                        {
                            metadata: {
                                labels: {
                                    run: app.name,
                                },
                                name: app.name,
                            },
                            spec: {
                                selector: {
                                    matchLabels: {
                                        run: app.name,
                                    },
                                },
                                template: {
                                    metadata: {
                                        labels: {
                                            run: app.name,
                                        },
                                    },
                                    spec: {
                                        containers: [
                                            {
                                                name: app.name,
                                                image: app.build.image,
                                                ports: app.expose.map((e) => ({
                                                    containerPort: e.port.from,
                                                    hostPort: e.port.to,
                                                })),
                                            },
                                        ],
                                    },
                                },
                            },
                        }
                    )
                ).body;
        }
    }
}
