import { tresLintConfig } from '@tresjs/eslint-config'

export default tresLintConfig({
  ignores: ['dist', 'node_modules', 'public', '.github', 'docs/blog'],
}, {
  rules: {
    'perfectionist/sort-named-exports': [
      'error',
      {
        type: 'line-length',
        order: 'asc',
      },
    ],
    'style/max-statements-per-line': 'off',
    'jsdoc/check-alignment': 'off',
    'vue/valid-template-root': 'off',
  },
})
