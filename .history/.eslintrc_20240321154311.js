module.exports = {
  extends: ['next', 'next/core-web-vitals', 'prettier', 'airbnb'],
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    "import/extensions": ['error', 'ignorePackages, {
      "js": "always",
      "mjs": "always"
    }],
    'space-infix-ops': 'warn',
    'react/jsx-max-props-per-line': 'warn',
    'react/jsx-tag-spacing': 'warn',
    'react/no-unescaped-entities': 'warn',
    'eol-last': 'warn',
    'keyword-spacing': 'warn',
    'react/self-closing-comp': 'warn',
    'no-multiple-empty-lines': 'warn',
    'react/jsx-first-prop-new-line': 'warn',
    'react/jsx-indent-props': 'warn',
    'space-before-blocks': 'warn',
    'object-curly-spacing': 'warn',
    'react/jsx-closing-bracket-location': 'warn',
    'brace-style': 'warn',
    'react/jsx-props-no-multi-spaces': 'warn',
    'block-spacing': 'warn',
    'react/jsx-wrap-multilines': 'warn',
    semi: 'warn',
    'import/order': 'warn',
    'arrow-spacing': 'warn',
    'padded-blocks': 'warn',
    'react/jsx-indent': 'warn',
    'react/jsx-closing-tag-location': 'warn',
    quotes: 'warn',
    'no-unused-vars': 'off',
    'object-property-newline': 'warn',
    indent: 'warn',
    'jsx-quotes': 'warn',
    'no-multi-spaces': 'warn',
    'comma-spacing': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    'no-alert': 'off',
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx'] },
    ],
    'react/jsx-one-expression-per-line': [0],
    'no-console': [
      0,
      { allow: ['error', 'warn'] },
    ],
    'no-trailing-spaces': 'warn',
    'comma-dangle': ['warn'],
    'no-debugger': 1,
    'linebreak-style': 0,
    'max-len': [1, 200, 2],
    'no-plusplus': [
      2, { allowForLoopAfterthoughts: true },
    ],
    'jsx-a11y/label-has-associated-control': [
      'error', { required: { some: ['nesting', 'id'] } },
    ],
    'jsx-a11y/label-has-for': [
      'error', { required: { some: ['nesting', 'id'] } },
    ],
  },
};
