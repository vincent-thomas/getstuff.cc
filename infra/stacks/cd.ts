import { type App, Stack, type StackProps } from "aws-cdk-lib";
import { Repository } from "aws-cdk-lib/aws-ecr";

export class CDPipeline extends Stack {
  repository: Repository;

  constructor(stack: App, id: string, props: StackProps) {
    super(stack, id, props);

    this.repository = new Repository(this, "repo", {
      repositoryName: "getstuff.cc",
    });
  }
}
