// visit https://nextjs.org/docs/api-reference/next.config.js/introduction for more info
// starting from Next.js 10.2, all applications that do not use a custom webpack configuration in their next.config.js will automatically use webpack 5.

module.exports = {
  /** By default Next.js will add the `x-powered-by` header. This will opt-out of it */
  poweredByHeader: false,
  /**
   * In a NextJS project Strict mode is disabled by default, this will enable it.
   * Strict mode is highly recommented as it will better prepare your application for the future of react.
   */
  reactStrictMode: true,
  /** Headers allow you to set custom HTTP headers for an incoming request path. */
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "x-custom-header",
            value: "my custom header value",
          },
        ],
      },
    ];
  },
};
