module.exports = {
  root: true,
  extends: ['../../.eslintrc.js'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
      },
      typescript: {
        config: 'tsconfig.json',
        project: './packages/server',
        alwaysTryTypes: true
      }
    }
  },
  ignorePatterns: [
    '/lib/**/*' // Ignore built files.
  ],
  rules: {
    'import/no-unresolved': 0
  }
}
