import { ThreadContentSkeleton } from "./components/components";
import { pulse } from "packages/ui/keyframes";
import { border } from "src/components/recipies";
import { setupLoading } from "src/utils/setupPage";

export default setupLoading({
  Component() {
    return (
      <div
      className={cn(
        css({ p: "medium" }),
        stack({ direction: "col", gap: "md" }),
      )}
    >
      <div
        className={cn(
          css({ width: "full", bg: "bgComponent" }),
          border({ rounded: "radius" }),
        )}
        style={{
          height: "46px",
          animation: `${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
        }}
      />
      {[0, 1, 2, 3].map((_, index) => (
        <ThreadContentSkeleton key={index} />
      ))}
    </div>
    )
  }
})