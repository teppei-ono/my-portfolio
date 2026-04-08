import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // process.cwd() = current working directory = project/front
  sassOptions: {
    prependData: `@use "${path.resolve(process.cwd(), "src/styles/global")}" as *;\n`,
  },
};
export default nextConfig;