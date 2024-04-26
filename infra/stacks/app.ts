import { type App, Stack, type StackProps } from "aws-cdk-lib";
import { AllowedMethods, Distribution } from "aws-cdk-lib/aws-cloudfront";
import { FunctionUrlOrigin } from "aws-cdk-lib/aws-cloudfront-origins";
import type { IRepository } from "aws-cdk-lib/aws-ecr";
import {
  Architecture,
  Code,
  FunctionUrlAuthType,
  Handler,
  Function as Lambda,
  Runtime,
} from "aws-cdk-lib/aws-lambda";

interface AppStackProps extends StackProps {
  repository: IRepository;
}

export class AppStack extends Stack {
  constructor(stack: App, id: string, { repository, ...props }: AppStackProps) {
    super(stack, id, props);
    const lambda = new Lambda(this, "lambda-app", {
      code: Code.fromEcrImage(repository, {
        tagOrDigest: "8804117563",
      }),

      handler: Handler.FROM_IMAGE,
      runtime: Runtime.FROM_IMAGE,
      architecture: Architecture.ARM_64,
    });

    const url = lambda.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
    });
    new Distribution(this, "distro", {
      defaultBehavior: {
        origin: new FunctionUrlOrigin(url, {}),
        allowedMethods: AllowedMethods.ALLOW_ALL,
        compress: true,
      },
    });
  }
}
