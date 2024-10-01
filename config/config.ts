import { DevEuCentral } from "./dev/deveu-central-1";
import { DevUsEast } from "./dev/devus-east-1";




export const AppConfig={
    hpdemoDev:{
        env: {
            account: "015021686405",
            region: "us-east-1"
        },
        pipelineName: "hp-dev-demo-multiregion-github",
        pipelineStackName: "hp-dev-demo-multiregion-github",
        repoName: "hp-demo-ci-cd-multiregion-v2",
        repoTriggerBranch: "dev",
        githubOrg:"piyush-dubey",
        stages: [DevEuCentral, DevUsEast ],
    }
}