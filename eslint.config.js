// eslint.config.js

import { defineConfig } from 'eslint-define-config';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import stencil from 'eslint-plugin-stencil';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';

import path from 'path';
import { fileURLToPath } from 'url';

// Derive __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  files: ['packages/**/*.{js,jsx,ts,tsx}'],
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
      project: ['./tsconfig.json'],
      tsconfigRootDir: __dirname,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        project: './tsconfig.json',
      },
    },
  },
  plugins: {
    '@typescript-eslint': typescriptPlugin,
    stencil,
    react,
    'react-hooks': reactHooks,
    import: importPlugin,
    prettier: prettierPlugin,
  },
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
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
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
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
  ignores: [
    'node_modules/',
    'dist/',
    'build/',
    'coverage/',
    '**/*.d.ts',
    '*.config.js',
  ],
});
