import type { ReactNode } from "react"
import { css } from "src/components/styler.css";

const Layout = ({children}: {children: ReactNode}) => {
  return (
    <div vaul-drawer-wrapper="" className={css({height: "screen"})}>
      {children}
    </div>
  )
}

export default Layout;