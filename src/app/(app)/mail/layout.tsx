import type { ReactNode } from "react"



const Layout = ({children}: {children: ReactNode}) => {
  return (
    <div className="bg-background">
      <div vaul-drawer-wrapper="" className="h-screen">
        {children}
      </div>
    </div>
  )
}

export default Layout;