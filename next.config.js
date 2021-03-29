// visit https://nextjs.org/docs/api-reference/next.config.js/introduction for more info
// These configurations don't particularly mean anything, they are here to illustrate how you could use this file.

module.exports = {
  /** Enables webpack5 features, more info here: https://nextjs.org/docs/messages/webpack5 */
  future: {
    webpack5: true,
  },
  /** By default Next.js will add the `x-powered-by` header. This will opt-out of it */
  poweredByHeader: false,
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
