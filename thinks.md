# 实现思路介绍

# js支持

## 核心思路

eslint不论是extend, plugin，本质都是在eslint本身的基础上进行rules的增加和parser的替换修改。

而eslint的linter类，可以直接在浏览器中运行，同时具备定义parser和rules的能力。

鉴于此，可以抛弃eslint其他实现，直接基于linter增加常见rules，便可实现浏览器中运行。

目前，业内eslint的最佳实践基本都是基于airbnb-eslint-config实现。

其中，airbnb-eslint-config分为三部分，base、react、hooks,base部分是对eslint原始规则的错误提示等级进行划分，react借助eslint-plugin-react扩展了原有的eslint规则，hooks借助eslint-plugin-react-hooks扩展了原有的eslint规则。

对于基础的rules的配置，只需要在调用linter实例对代码进行检查时，作为参数传递即可实现该规则的应用。

对于借助react, react-hooks扩展的rules，需要提前调用linter实例的defineRules实现规则的定义，这样，在代码检查的配置中，即可实现对该规则的使用。

## 具体方案

涉及到几个公共库： 
1. airbnb: https://github.com/airbnb/javascript
2. eslint-plugin-react: https://github.com/yannickcr/eslint-plugin-react
3. eslint-plugin-react-hooks: https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks

对应的几个库中，均是commonjs的实现，本质均是导出rules,如果rules是新增的，那么使用defineRule进行规则新增，否则直接将其加入验证rules。
现有库未涉及nodejs独有的api，故直接使用webpack重新打包，浏览器即可直接使用。接下来只需要编写浏览器版的解析rules即可实现，由于工作量较大，仅保证主流程满足需要即可，不做eslint.json文件的解析等工作。直接按照配置 + rules的方式进行支持。

这就要求打包的过程中，需要完成对extension, plugin的解析。让其直接输出rules。最终只需要遍历rules，即可实现规则的增加及应用。

故最终会输出一个eslint项目：该项目依赖上述几个npm包

对其进行解析后输出rules，包括了对象的自定义rules及对base-rule的等级制定。从而使用者仅需要遍历rules即可生成最终的配置，从而使用linter对代码进行检查。

## js支持

最终小demo跑下来，将会以如下方式进行实现：
1. 新建eslint-browserify工程，会对eslint, eslint-config-airbnb, eslint-plugin-react, eslint-plugin-react-hooks重新打包，导出airbnb的推荐rules及扩展后的linter
2. webide端新开eslint webworker，在worker中调用eslint-browserify的功能，对输入的代码进行eslint标记。同时，在这一步，提供rules覆盖能力
3. monaco监听文件内容改变、创建等事件，通过versionid, 消抖等方案保障eslint返回标记的正确性以及用户体验的流畅性

# ts支持
需要替换parser，咱不做支持