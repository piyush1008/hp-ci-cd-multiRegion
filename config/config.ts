import { DevEuCentral } from "./dev/deveu-central-1";
import { DevUsEast } from "./dev/devus-east-1";



export const AppConfig={
    hpdemoDev:{
        env: {
            account: "015021686405",
            region: "us-east-1"
        },
        pipelineName: "hp-dev-multiregion-github",
        pipelineStackName: "hp-dev-multiregion-github",
        repoName: "hp-ci-cd-multiRegion",
        repoTriggerBranch: "dev",
        githubOrg:"piyush1008",
        stages: [DevEuCentral, DevUsEast ],
    },
    hpdemoLab:{
        env: {
            account: "015021686405",
            region: "us-east-1"
        },
        pipelineName: "hp-lab-multiregion-github",
        pipelineStackName: "hp-lab-multiregion-github",
        repoName: "hp-ci-cd-multiRegion",
        repoTriggerBranch: "lab",
        githubOrg:"piyush1008",
        stages: [DevEuCentral, DevUsEast ],
    }
}