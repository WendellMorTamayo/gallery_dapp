import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import commonjs from "vite-plugin-commonjs";
import {loadEnv} from 'vite'
// https://vitejs.dev/config/
// export default defineConfig(
//     return {
//         optimizeDeps: {
//             include: ['react', 'react-dom'],
//         },
//
//     plugins: [
//         react(),
//         commonjs({
//             filter(id) {
//                 if (id.includes('node_modules/redux-storage/build-es')) {
//                     return true;
//                 }
//             },
//         }),
//     ],
// })

export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        optimizeDeps: {
            include: ['react', 'react-dom'],
        },
        define: {
            'process.env.SOME_KEY': JSON.stringify(env.SOME_KEY)
        },
        plugins: [react(),
            commonjs({
                filter(id) {
                    if (id.includes('node_modules/redux-storage/build-es')) {
                        return true;
                    }
                },
            }),],
    }
})


