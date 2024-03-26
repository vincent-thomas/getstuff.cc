import type { ReactNode } from "react"



const Layout = ({children}: {children: ReactNode}) => {
  return (
    <div vaul-drawer-wrapper="" className="h-screen">
      {children}
    </div>
  )
}

export default Layout;