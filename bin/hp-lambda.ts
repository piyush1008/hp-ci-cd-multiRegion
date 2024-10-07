#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { HpLambdaStack } from '../lib/hp-lambda-stack';
import { AppConfig } from '../config/config';

const app = new cdk.App();
const pipeline = app.node.tryGetContext('pipeline');

function buildStack(){

  if (!pipeline) {
    throw new Error(`could not find pipeline context did you forget to add -c to your deploy command?`);
  }

  switch(pipeline)
  {
     case "dev":
       new HpLambdaStack(app, 'hp-lambda-dev',"dev", AppConfig.hpdemoDev );
       break;

     case "lab":
       new HpLambdaStack(app, 'hp-lambda-lab',"lab", AppConfig.hpdemoLab);
        break;
     case "prod":
      //  new HpLambdaStack(app, 'hp-lambda-prod', { env: { region:"us-east-1"}});
       break;

  }


  


}




buildStack();