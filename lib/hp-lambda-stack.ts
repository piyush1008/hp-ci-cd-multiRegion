import * as cdk from 'aws-cdk-lib';
import { Repository } from 'aws-cdk-lib/aws-codecommit';
import { Construct } from 'constructs';
import { PipelineStackProps } from '../model/PipelineStackProps';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { LinuxBuildImage } from 'aws-cdk-lib/aws-codebuild';
import { ApplicationStage } from '../src/stages/ApplicationStage';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import * as iam from 'aws-cdk-lib/aws-iam';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class HpLambdaStack extends cdk.Stack {

  private _pipelineName:string;
  private _props:PipelineStackProps
  constructor(scope: Construct, id: string, pipelineName:string, props: PipelineStackProps) {
    super(scope, id, props);

    this._pipelineName = pipelineName;
    this._props = props;
    
    //create a pipeline with github repository
    const pipeline = this._createPipeline();


    //add stages to pipeline
    this.createStage(pipeline)
  }



    
  private _createPipeline(){
     const PIPELINE_NAME=this._props.pipelineName;
     const githubOrg = this._props.githubOrg
     const githubRepo = this._props.repoName;
     const githubBranch = this._props.repoTriggerBranch;


    //  const pipelineRole = new iam.Role(this, 'PipelineRole', {
    //   assumedBy: new iam.ServicePrincipal('codepipeline.amazonaws.com'),
    //   managedPolicies: [
    //     iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess'),
    //   ]
    // // });

    //  const githubTokenSecret  = secretsmanager.Secret.fromSecretNameV2(this, 'GitHubToken', 'github-token');
    //  githubTokenSecret.grantRead(pipelineRole);

    //  / input: CodePipelineSource.gitHub(`${githubOrg}/${githubRepo}`, githubBranch, {
    //   authentication: githubToken.secretValue,
    // }),

    // const githubToken = githubTokenSecret.secretValue.unsafeUnwrap();

// // Temporarily log the token value (for debugging purposes)
//       new cdk.CfnOutput(this, 'GitHubTokenOutput', {
//         value: githubToken || 'Token not found',
//         description: 'Temporary output of GitHub Token for debugging'
//       });


      // const codeBuildRole = new iam.Role(this, 'CodeBuildRole', {
      //   assumedBy: new iam.ServicePrincipal('codebuild.amazonaws.com'),
      //   managedPolicies: [
      //     iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess'),
      //   ]
      // });

     const pipeline = new CodePipeline(this, "CDKPipeline", {
      crossAccountKeys: true,
      pipelineName:PIPELINE_NAME,
      selfMutation: true,
      publishAssetsInParallel: false,
      // role: pipelineRole, // Attach the custom role to the pipeline
      codeBuildDefaults: {
        buildEnvironment: {
          buildImage: LinuxBuildImage.STANDARD_7_0,
        },
        timeout: cdk.Duration.minutes(480),
      },
      synth: new ShellStep("deploy", {
        input: CodePipelineSource.gitHub(`${githubOrg}/${githubRepo}`, githubBranch),
        commands: [ 
          "npm ci",
          "npm run build",
          `npx cdk synth -c pipeline=${this._pipelineName}`,
        ]
      }),
    });

    return pipeline;
  }

  public createStage(pipeline:CodePipeline)
  {
      const applicationWave=pipeline.addWave("Application");

      for(let i=0;i<this._props.stages.length;i++)
      {
          const stage = this._props.stages[i];

          const appStage=new ApplicationStage(this, `hpdemogit${i+1}`,stage)
          applicationWave.addStage(appStage)

      
      }
  }
}

