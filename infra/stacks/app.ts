import { Stack, type StackProps } from "aws-cdk-lib";
import { Distribution } from "aws-cdk-lib/aws-cloudfront";
import { FunctionUrlOrigin } from "aws-cdk-lib/aws-cloudfront-origins";
import type { IRepository } from "aws-cdk-lib/aws-ecr";
import {
  Architecture,
  Code,
  Handler,
  Function as Lambda,
  Runtime,
} from "aws-cdk-lib/aws-lambda";

interface AppStackProps extends StackProps {
  repository: IRepository;
}

export class AppStack extends Stack {
  constructor(
    stack: Stack,
    id: string,
    { repository, ...props }: AppStackProps,
  ) {
    super(stack, id, props);
    const lambda = new Lambda(this, "lambda-app", {
      code: Code.fromEcrImage(repository),
      handler: Handler.FROM_IMAGE,
      runtime: Runtime.FROM_IMAGE,
      architecture: Architecture.ARM_64,
    });

    const url = lambda.addFunctionUrl();
    new Distribution(this, "distro", {
      defaultBehavior: {
        origin: new FunctionUrlOrigin(url),
      },
    });
  }
}
