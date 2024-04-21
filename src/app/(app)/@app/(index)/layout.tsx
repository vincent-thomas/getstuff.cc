import { setupLayout } from "src/utils/setupPage";
import { CreateAliasButton } from "../components/create-alias";
import { Search } from "../components/search-field";

export default setupLayout({
  Component({ children }) {
    return (
      <>
        <div className={cn(stack({ justify: "between" }))}>
          <Search />
          <CreateAliasButton />
        </div>
        <div className={cn(css({ overflowY: "auto", maxHeight: "full" }))}>
          <div>{children}</div>
        </div>
      </>
    );
  },
});
