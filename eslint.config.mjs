import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

const config = [
  {
    ignores: ['.next/**', 'out/**', 'node_modules/**']
  },
  ...nextCoreWebVitals,
  {
    rules: {
      'react/prop-types': 0,
      'react/no-unescaped-entities': 0
    }
  }
];

export default config;
