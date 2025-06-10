import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import svgSpritePlugin from 'vite-plugin-svg-sprite';
import classHashPlugin from './vite-plugin-class-hasher';

export default defineConfig({
  root: 'src',
  build: {
    rollupOptions: {
      input: {
        main: './src/index.html',
        privacy: './src/privacyPolicy.html',
        terms: './src/termsConditions.html',
        cookies: './src/cookiePolicy.html',
      },
    },
    outDir: '../dist',
  },
  plugins: [
    classHashPlugin(),
    injectHTML(),
    FullReload(['./src/**/**.html']),
    svgSpritePlugin({
      symbolId: 'icon-[name]',
      include: ['**/src/img/*.svg'],
    }),
  ],
});
