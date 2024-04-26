export const unimportConfig = {
  dts: true,
  imports: [
    {
      from: "@/env",
      name: "env",
    },
    {
      from: "@style-system/css",
      name: "css",
    },
    {
      from: "@style-system/utils",
      name: "cn",
    },
    {
      from: "@style-system/patterns",
      name: "stack",
    },
    {
      from: "@style-system/palette",
      name: "palette",
    },
    {
      from: "packages/logger",
      name: "logger",
    },
  ],
};
