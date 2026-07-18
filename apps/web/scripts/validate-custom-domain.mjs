import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const wranglerPath = resolve(scriptDir, '..', 'wrangler.jsonc');
const wranglerConfig = readFileSync(wranglerPath, 'utf8');

if (wranglerConfig.includes('yourdomain.com')) {
  console.error(
    [
      'Deployment blocked: apps/web/wrangler.jsonc still contains the placeholder domain "yourdomain.com".',
      'Replace it with your real custom domain before deploying this template.',
    ].join('\n'),
  );

  // eslint-disable-next-line node/prefer-global/process
  process.exit(1);
}
