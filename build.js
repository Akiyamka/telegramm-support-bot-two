import esbuild from 'esbuild';
import envPlugin from '@chialab/esbuild-plugin-env';

const { errors, warnings } = await esbuild.build({
    entryPoints: ['src/webhook.ts'],
    outfile: 'build/webhook.js',
    bundle: true,
    platform: 'node',
    plugins: [
        envPlugin(),
    ],
});

if (warnings) {
  warnings.forEach(e => console.warning(e))
}

if (errors) {
  errors.forEach(e => console.error(e))
}

