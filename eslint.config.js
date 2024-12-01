module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2023, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Enable parsing of JSX
    },
    project: ['./tsconfig.json'], // Specify it only for TypeScript files
    tsconfigRootDir: __dirname,
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the react version
    },
    'import/resolver': {
      typescript: {
        // Use <root>/tsconfig.json
        project: './tsconfig.json',
      },
    },
  },
  env: {
    browser: true,
    node: true,
    es2023: true,
    jest: true,
  },
  plugins: [
    '@typescript-eslint',
    'stencil',
    'react',
    'react-hooks',
    'import',
    'prettier',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // TypeScript rules
    'plugin:stencil/recommended', // Stencil rules
    'plugin:react/recommended', // React rules
    'plugin:react-hooks/recommended', // React Hooks rules
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier/recommended', // Integrates Prettier with ESLint
  ],
  rules: {
    // General JavaScript rules
    'no-unused-vars': 'off', // Disable base rule as it can report incorrect errors
    '@typescript-eslint/no-unused-vars': ['warn'],

    // Import rules
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['sibling', 'parent'],
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/no-unresolved': 'error',

    // Stencil specific rules
    'stencil/strict-boolean-conditions': 'warn',

    // React specific rules
    'react/prop-types': 'off', // Disable if using TypeScript for type checking
    'react/react-in-jsx-scope': 'off', // Not needed with React 17+

    // Prettier
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: true,
        trailingComma: 'all',
        printWidth: 80,
        tabWidth: 2,
        endOfLine: 'auto',
      },
    ],
  },
  overrides: [
    {
      // Enable additional rules for TypeScript files
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        // Place TypeScript-specific rules here
      },
    },
    {
      // Enable additional rules for Stencil config files
      files: ['**/stencil.config.ts'],
      rules: {
        // Place Stencil config-specific rules here
      },
    },
  ],
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'build/',
    'coverage/',
    '**/*.d.ts',
    '*.config.js',
  ],
};
