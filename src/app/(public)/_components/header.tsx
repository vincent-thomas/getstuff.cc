import { cn } from "@stuff/components/utils";
import { Section } from "./section";
import {Flex} from "@stuff/structure"
import { H1, P } from "@stuff/typography";

export const HeroTitle = ({className, title, comment, under}: {
  className?:string, 
  title: string | JSX.Element;
  under?: JSX.Element;
  comment: string | JSX.Element;
}) =>{ 
  return (
     <Flex col className={cn(className)}>
        <H1 className="!font-[800] w-full max-w-[400px] lg:max-w-[610px] lg:text-6xl">{title}</H1>
        <P className="text-lg font-semibold">{comment}</P>
        {!!under && (
          <div className="pt-2">
            {under}
          </div>
        )}
      </Flex>
  )
}

export const PageHeador = ({
  title,
  comment,
  under,
  containerClassName,
  maxWOverride
}: {
  title: string | JSX.Element;
  comment: string | JSX.Element;
  containerClassName?:string;
  maxWOverride?: string;
  under?: JSX.Element;
}) => {
  return (
    <Section style={maxWOverride ? {maxWidth: maxWOverride} : {}}>
      <Flex col className={cn("pt-28", containerClassName)}>
        <H1 className="!font-[800] w-full max-w-[400px] lg:max-w-[610px] lg:text-6xl">{title}</H1>
        <P className="text-lg font-semibold">{comment}</P>
        {!!under && (
          <div className="pt-2">
            {under}
          </div>
        )}
      </Flex>
    </Section>
  );
};
