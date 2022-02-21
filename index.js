import reactRules from 'eslint-plugin-react';
// import { rules as importRule } from 'eslint-plugin-import';
import eslint from './eslint';
import reactHooksRule from 'eslint-plugin-react-hooks';
import airbnbBP from 'eslint-config-airbnb-base/rules/best-practices';
import airbnbERR from 'eslint-config-airbnb-base/rules/errors';
import airbnbES from 'eslint-config-airbnb-base/rules/es6';
// import airbnbImports from 'eslint-config-airbnb-base/rules/imports';
import airbnbNode from 'eslint-config-airbnb-base/rules/node';
import airbnbStrict from 'eslint-config-airbnb-base/rules/strict';
import airbnbStyle from 'eslint-config-airbnb-base/rules/style';
import airbnbVariables from 'eslint-config-airbnb-base/rules/variables';
import airbnbReact from 'eslint-config-airbnb/rules/react';
import airbnbReactHooks from 'eslint-config-airbnb/rules/react-hooks';

export const rules = {};

Object.assign(rules,
    airbnbBP.rules,
    airbnbERR.rules,
    airbnbES.rules,
    // airbnbImports.rules,
    airbnbNode.rules,
    airbnbStrict.rules,
    airbnbStyle.rules,
    airbnbVariables.rules,
    airbnbReact.rules,
    airbnbReactHooks.rules,
);

export const esLinter = new eslint.Linter();

Object.keys(reactRules.rules).forEach(ruleKey => {
    esLinter.defineRule(`react/${ruleKey}`, reactRules.rules[ruleKey]);
});

Object.keys(reactHooksRule.rules).forEach(ruleKey => {
    esLinter.defineRule(`react-hooks/${ruleKey}`, reactHooksRule.rules[ruleKey]);
});

export const config = {
    rules,
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    env: {
        browser: true
    },
}

// Object.keys(importRule.rules).forEach(ruleKey => {
//     esLinter.defineRule(`import/${ruleKey}`, importRule.rules[ruleKey]);
// });