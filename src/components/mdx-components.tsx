import {useMDXComponent} from "next-contentlayer/hooks"
import { H2, H3, P } from "./typography";
import { z } from "zod";

const components = {
  h2: ({...props}) => {
    const id = z.string().parse(props.children).toString().toLowerCase().replace(/\s/g, "-");
    return (
      <a href={`#${id}`} className="mt-8 block">
        <H2 id={id} className="pb-2 scroll-m-14 border-b border-border text-3xl font-semibold tracking-tight transition-colors first:mt-0" {...props} />
      </a>
    )
  },
  h3: ({...props}) => (
    <H3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight" {...props} />
  ),
  p: ({...props}) => (
    <P className="leading-7 [&:not(:first-child)]:mt-4" {...props} />
  )
};

interface MdxProps {
  code: string
}

export function Mdx({code}: MdxProps) {;
  const Component = useMDXComponent(code)
  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  )
}