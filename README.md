babel-plugin-replace-property
====================

Replaces `${property}` with a value defined in the options.

### Example
Input:
JS:
```javascript
const something = "${constant}";
```
Options:
```json
{
    "replacements": {
        "constant": "truffles"
    }
}
```
Output:
```javascript
const something = "truffles";
```
