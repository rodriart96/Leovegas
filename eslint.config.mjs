import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

const eslintConfig = {
  files: ['**/*.{js,mjs,cjs,jsx}'], // Specify the files to which this configuration applies
  languageOptions: {
    globals: {
      ...globals.browser, // Include browser-specific globals
      // Add other globals if needed
    },
    parserOptions: {
      ecmaVersion: 2021, // Set ECMAScript version
      sourceType: 'module', // Allow ES module imports
    },
  },
  plugins: {
    'react': pluginReact,
  },
  extends: [
    pluginJs.configs.recommended, // Apply ESLint’s recommended JavaScript configuration
    pluginReact.configs.flat.recommended, // Apply the recommended configuration for React
  ],
  rules: {
    'indent': ['error', 2], // Enforce 2 spaces for indentation
    'linebreak-style': ['error', 'unix'], // Enforce Unix linebreaks
    'quotes': ['error', 'single'], // Enforce single quotes
    'semi': ['error', 'always'], // Enforce semicolons
  },
};

export default eslintConfig;
