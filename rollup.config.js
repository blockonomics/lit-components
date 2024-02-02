import typescript from '@rollup/plugin-typescript';
import terser from "@rollup/plugin-terser";
import resolve from '@rollup/plugin-node-resolve';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'dist/index.cjs.js',
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: 'dist/index.esm.js',
            format: 'es',
            sourcemap: true,
        }
    ],
    plugins: [
        typescript(),
        terser(),
        resolve()
    ]
};