declare module 'next-pwa' {
  interface RuntimeCacheOptions {
    cacheName?: string;
    expiration?: {
      maxEntries?: number;
      maxAgeSeconds?: number;
    };
    networkTimeoutSeconds?: number;
    [key: string]: unknown;
  }

  interface RuntimeCacheRule {
    urlPattern: RegExp | string;
    handler: string;
    options?: RuntimeCacheOptions;
  }

  interface PWAOptions {
    dest: string;
    register?: boolean;
    skipWaiting?: boolean;
    disable?: boolean;
    sw?: string;
    scope?: string;
    runtimeCaching?: RuntimeCacheRule[];
    buildExcludes?: Array<string | RegExp>;
    dynamicStartUrl?: boolean;
  }

  function withPWAInit(options: PWAOptions): (config: Record<string, unknown>) => Record<string, unknown>;
  export default withPWAInit;
} 