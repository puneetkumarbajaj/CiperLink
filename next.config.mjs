/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      config.module.rules.push({
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      });
  
      // Add this new rule
      config.module.rules.push({
        test: /node_modules\/web-worker\/.*\.js$/,
        use: 'null-loader'
      });
  
      return config;
    },
    transpilePackages: ['snarkjs', 'ffjavascript', 'web-worker'],
  };
  
  export default nextConfig;