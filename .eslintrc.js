module.exports = {
    'env': {
        'browser': true,
        'es6': true
    },
    "extends": ['eslint:recommended', 'plugin:promise/recommended'],
    'parserOptions': {
        'ecmaVersion': 11,
        'sourceType': 'module'
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ]
    }
};
