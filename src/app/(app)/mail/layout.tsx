import type { ReactNode } from "react"


const Layout = ({children}: {children: ReactNode}) => {
  return (
    <div vaul-drawer-wrapper="" className={css({height: "screen"})}>
      {children}
    </div>
  )
}

export default Layout;