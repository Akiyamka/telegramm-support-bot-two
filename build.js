import esbuild from 'esbuild';
import envPlugin from '@chialab/esbuild-plugin-env';

const makeAllPackagesExternalPlugin = {
  name: 'make-all-packages-external',
  setup(build) {
    let filter = /^[^.\/]|^\.[^.\/]|^\.\.[^\/]/ // Must not start with "/" or "./" or "../"
    build.onResolve({ filter }, args => ({ path: args.path, external: true }))
  },
}

const { errors, warnings } = await esbuild.build({
  entryPoints: ['src/webhook.ts'],
  outfile: 'build/webhook.js',
  bundle: true,
  format: 'esm',
  platform: 'node',
  plugins: [envPlugin(), makeAllPackagesExternalPlugin],
});

if (warnings) {
  warnings.forEach((e) => console.warning(e));
}

if (errors) {
  errors.forEach((e) => console.error(e));
}
