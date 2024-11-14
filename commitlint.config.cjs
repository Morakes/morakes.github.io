module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feature',
        'fixbug',
        'refactor',
        'build',
        'docs',
        'test',
        'chore',
        'style',
        'revert',
      ],
    ],
    'subject-case': [0, 'never'],
  },
}
