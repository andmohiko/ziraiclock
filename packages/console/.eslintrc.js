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
        project: './packages/console',
        alwaysTryTypes: true
      }
    }
  }
}
