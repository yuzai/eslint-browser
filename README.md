## demo

[demo演示](yuzai.github.io/eslint-browser/)

## 目的

满足webide在eslint在浏览器中使用，内置airbnb-config, 支持react, react/hooks规则，可以通过config.rule去修改规则的配置

## 使用方法

只导出了amd格式，在dist目录下。

使用时，建议在web worker中通过importScripts引入，当然，也可以通过script标签或者amd的方式引入到主进程做测试。

## 使用示例

1. 使用script标签引入，或在web worker中通过importScripts引入

2. 和monaco配合，示例代码如下:

```js
function verify() {
    const value = model.getValue();

    const errs = linter.esLinter.verify(value, linter.config);

    const severityMap = {
        2: 8, // 2 for eslint is error
        1: 4, // 1 for eslint is warning
    }

    const ruleDefines = linter.esLinter.getRules();

    const markers = errs.map(err => ({
        code: {
            value: err.ruleId,
            target: ruleDefines.get(err.ruleId).meta.docs.url,
        },
        startLineNumber: err.line,
        endLineNumber: err.endLine,
        startColumn: err.column,
        endColumn: err.endColumn,
        message: err.message,
        // 设置错误的等级，此处eslint与monaco的存在差异，做一层映射
        severity: severityMap[err.severity],
        source: 'eslint',
    }));

    monaco.editor.setModelMarkers(model, 'eslint', markers);
}
```

完整的使用实例可以参考工程下的index.html。也可查看其[demo演示](yuzai.github.io/eslint-browser/)

## 背后思路

参考本工程下[thinks.md](https://github.com/yuzai/eslint-browser/blob/main/thinks.md)，也可参考[文章-还未发表]()中eslint部分;

## 最后

觉得还行的话，给颗星星，比心(..•˘○˘•..)
