/**
 * prerender.mjs
 * Post-build static prerender script for Acentra Service.
 *
 * This script:
 *  1. Builds the SSR bundle from src/entry-server.tsx
 *  2. Calls render() to get the full HTML string
 *  3. Injects the HTML into dist/index.html
 *  4. Cleans up temporary SSR bundle
 *
 * Run automatically via: npm run build → vite build && node prerender.mjs
 */

import { build } from 'vite';
import { readFileSync, writeFileSync, rmSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, 'dist');
const ssrOutDir = resolve(__dirname, 'dist-ssr');
const ssrEntry = resolve(__dirname, 'src/entry-server.tsx');
const indexHtmlPath = resolve(distDir, 'index.html');
const ssrBundlePath = resolve(ssrOutDir, 'entry-server.js');

async function prerender() {
  console.log('\n🔨 [prerender] Building SSR bundle...');

  // 1. Build SSR bundle (Node.js target, no CSS injection)
  await build({
    build: {
      ssr: ssrEntry,
      outDir: ssrOutDir,
      rollupOptions: {
        output: {
          format: 'esm',
          entryFileNames: 'entry-server.js',
        },
      },
    },
    // Replace motion/react with SSR-safe stubs during server build
    resolve: {
      alias: {
        'motion/react': resolve(__dirname, 'src/motion-ssr-mock.tsx'),
      },
    },
    // Disable CSS injection plugin for SSR build
    plugins: [],
    ssr: {
      // Externalize node_modules to speed up SSR build
      noExternal: [],
    },
  });

  console.log('✅ [prerender] SSR bundle built');

  // 2. Import and run render()
  console.log('🚀 [prerender] Rendering app to HTML string...');
  const ssrBundleUrl = pathToFileURL(ssrBundlePath).href;
  const { render } = await import(ssrBundleUrl);
  const appHtml = render();

  console.log(`✅ [prerender] Generated ${appHtml.length.toLocaleString()} bytes of HTML`);

  // 3. Read dist/index.html and inject rendered HTML
  const template = readFileSync(indexHtmlPath, 'utf-8');
  const output = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  );

  if (output === template) {
    console.warn('⚠️  [prerender] Could not find <div id="root"></div> placeholder in index.html — prerender skipped.');
    console.warn('    Check that index.html contains exactly: <div id="root"></div>');
  } else {
    writeFileSync(indexHtmlPath, output);
    console.log('✅ [prerender] Injected server-rendered HTML into dist/index.html');
  }

  // 4. Clean up temporary SSR bundle
  if (existsSync(ssrOutDir)) {
    rmSync(ssrOutDir, { recursive: true, force: true });
    console.log('🧹 [prerender] Cleaned up temporary SSR bundle');
  }

  console.log('\n✨ [prerender] Static prerender complete!\n');
}

prerender().catch((err) => {
  console.error('❌ [prerender] Error during prerender:', err);
  process.exit(1);
});
