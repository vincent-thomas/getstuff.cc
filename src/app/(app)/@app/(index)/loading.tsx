import { setupLoading } from "src/utils/setupPage";

export default setupLoading({
  Component() {
    return (
      <></>
      // <div className={cn(stack({ direction: "col", gap: "md" }))}>
      //   {[0, 1, 2].map(v => (
      //     <div
      //       style={{ height: "91px" }}
      //       key={v}
      //       className={cn(
      //         stack({ gap: "md", align: "center" }),
      //         css({ bg: "bgComponent" }),
      //         border({ rounded: "radius" }),
      //       )}
      //     />
      //   ))}
      // </div>
    );
  },
});
