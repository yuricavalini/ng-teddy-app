module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-empty': [2, 'never'], // Enforces the presence of a scope,
    'scope-enum': [2, 'always', ['ng-teddy-app']], // Only allows 'courses-state-management' as scope
  },
};
