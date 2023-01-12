import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
// @ts-ignore
import postcssPresetEnv from "postcss-preset-env";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  css:{
    postcss:{
      plugins:[
        postcssPresetEnv({stage : 0})
      ],
    }
  },
  base:'./'
})
