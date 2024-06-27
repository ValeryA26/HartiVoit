import { mergeApplicationConfig, ApplicationConfig, importProvidersFrom } from "@angular/core";
import { appConfig } from "./app.config";
import { ClarityModule, ClrHeader } from "@clr/angular";

const serverConfig: ApplicationConfig = {
    providers:[
        importProvidersFrom(ClarityModule, ClrHeader)
    ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);