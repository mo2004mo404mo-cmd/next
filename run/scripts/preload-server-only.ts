/** Bun preload: stub Next.js's server-only guard so plain bun scripts can
 * import app server code outside the Next.js runtime (smoke tests only). */
import { plugin } from 'bun';

plugin({
  name: 'server-only-stub',
  setup(build) {
    build.module('server-only', () => ({ exports: {}, loader: 'object' }));
    build.module('client-only', () => ({ exports: {}, loader: 'object' }));
  },
});
