module.exports = {
    "env": {
        "browser": true,
        "es2020": true,
        "jasmine": true,
        "jest": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "max-len": [2, {"code": 120}]
    },
    "globals": {
        "render": "readonly",
        "mount": "readonly",
        "shallow": "readonly"
    }
};
