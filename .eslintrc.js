module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    root:true,
    extends: [
        'plugin:react/recommended',
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint'
    ],
    rules: {
        "@typescript-eslint/ban-ts-comment": "off",
    }
}
