module.exports = {
    "extends": "standard",
    "env": {
        "jest": true
    },
    "plugins": [
        "standard",
        "promise"
    ],
    "rules": {
        "semi": 0,
        "indent": ["error", 4],
        "no-tabs": 0,
        "no-mixed-spaces-and-tabs": 1,
        "space-before-function-paren": 0,
        "spaced-comment": ["error", "always"]
    }
};