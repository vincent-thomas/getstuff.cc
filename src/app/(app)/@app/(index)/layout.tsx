import { setupLayout } from "src/utils/setupPage";
import { CreateAliasButton } from "../components/create-alias";

export default setupLayout({
  Component({ children }) {
    return (
      <div className={cn(stack({ direction: "col", gap: "lg" }))}>
        <div className={cn(stack({ justify: "end" }))}>
          <CreateAliasButton />
        </div>
        {children}
      </div>
    );
  },
});
