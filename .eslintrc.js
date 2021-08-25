module.exports = {
    'env': {
        'browser': true,
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 9,
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
