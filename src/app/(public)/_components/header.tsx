import { cn } from "@stuff/components/utils";
import { Section } from "./section";
import { H1, P } from "@stuff/typography";
import { Heading } from "@stuff/ui/title";
;
import { stack } from "src/components/recipies";

export const HeroTitle = ({className, title, comment, under}: {
  className?:string, 
  title: string | JSX.Element;
  under?: JSX.Element;
  comment: string | JSX.Element;
}) => (
  <div className={cn(stack({direction: "col", align: {desktop: "start", mobile: "center"}}),className)}>
    <Heading weight="bold" style={{width: "100%"}}
    className={css({fontSize: {mobile: "large", desktop: "3xlarge"}})}
    >{title}</Heading>
    <P className={css({fontSize: "medium",fontWeight: "semibold"})}>{comment}</P>
    {!!under && (
      <div className={css({paddingTop: "small"})}>
        {under}
      </div>
    )}
  </div>
)

export const PageHeador = ({
  title,
  comment,
  under,
  containerClassName,
}: {
  title: string | JSX.Element;
  comment: string | JSX.Element;
  containerClassName?:string;
  under?: JSX.Element;
}) => {
  return (
    <Section maxWidth="md">
      <div className={cn(stack({direction: "col"}),containerClassName)}>
        <H1 className={css({fontSize: {desktop: "4xlarge", mobile: "xlarge"}, fontWeight: "semibold"})}>{title}</H1>
        <P className="text-lg font-semibold">{comment}</P>
        {!!under && (
          <div className="pt-2">
            {under}
          </div>
        )}
      </div>
    </Section>
  );
};
