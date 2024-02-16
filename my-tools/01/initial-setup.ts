const first = {
    terminal01: 'yarn init --yes',
    terminal02: 'yarn add express',
    terminal03: 'yarn add nodemon --dev',
    terminal04: 'yarn add typescript ts-node @types/node @types/express --dev',
    terminal05: 'yarn tsc --init',
}
// 1.6 предпочтительное содержимое tsconfig.json
//  {
//  "compilerOptions": {
//    "target": "es2016",
//    "module": "commonjs",
//    "outDir": "./dist",
//    "strict": true,
//    "noImplicitReturns": true,
//    "esModuleInterop": true,
//    "allowSyntheticDefaultImports": true,
//    "skipLibCheck": true,
//    "forceConsistentCasingInFileNames": true
//  },
//  "include": ["src/**/*"],
//"exclude": ["node_modules", "**/*.test.ts"]
// 1.7 в package.json добавляем scripts:
//     "scripts": {
//     "dev": "yarn nodemon --inspect dist/index.js",
//         "watch": "tsc -w"
// },

const forTest = {
    terminal01: 'yarn add jest ts-jest @types/jest supertest @types/supertest',
    terminal02: 'yarn ts-jest config:init'
}

//добавить ещё один скрипт для теста
//"jest": "jest -i"

// yarn add express-valodator