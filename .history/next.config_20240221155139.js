module.exports = {
  reactStrictMode: true,
  // I don't want it to run when compiling as I trust the CI stage of the pipeline and Husky.
  ignoreDuringBuilds: true,
};
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
}
 
module.exports = nextConfig
