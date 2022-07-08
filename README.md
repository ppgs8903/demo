# demo 简介
1. 处理vpn问题+框架搭建+选择时间下午1.30结束
2. 2点开始code - 凌晨2点base框架搭建完毕
3. 项目可以看下截图

## 整体考虑 从0->1搭建
1. 选型 vue cli + axios + day + elementui： demo搭建、减少项目时间，并且有自在的eslint 可以满足规范。
## 处理问题
1. axios 封装请求
2. 尝试封装
3. moment 格式化时间
4. elementui 主要是用图片和layout、防止太大用插件做按需引入,暂时不配置script 方式
5. 代码风格 eslint + Prettier + editconfig
6. scss + 全局
7. 配置文件 .env.xxx 这里只放env


## 项目参考
Flarum [https://docs.flarum.org/zh] css 参考

## 文档地址
1. 接口文档地址： https://newsapi.org/

## 文件结构
```
img - 录像之类的
public - 静态文件位置
src -
  assets - 编译进组件的资源文件，也有全局的scss和css重置
  compoments - 组件目录（xxx.vue + xxx.scss）组合
  constant - 常量，主要用于枚举方案，方便以后修改
  router - 无用，cli创建后生成
  services - api 目录，外层封装axios，增加前后过滤，前过滤追加apikey，后过滤主要是探矿
  utils - 一部分公共的tools，比较晚后面就没抽取
.browserslistrc - 根据浏览器策略来进行自动兼容
.editorconfig - ide的配置策略
.env - 配置文件，必须VUE_APP_XXX，否则无法导入
.eslintrc.js - eslint 规则配置
.gitignore - 代码管理器忽略策略
babel.config.js - 转换代码配置，以及按需加载插件配置
lint-staged.config.js - 提交时候出发check规则
vue.config.js - vue cli 下的webpack 配置文件
yarn.lock - yarn 生成的缓存文件
```

## 代码风格
[vscode 自动格式化](https://www.freesion.com/article/8527264381/)
```
#mac-》code-》首选项-》设置-》setting.json 填入下
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "redhat.telemetry.enabled": true,
    "git.autofetch": true,
    "git.confirmSync": false,
    "eslint.run": "onSave",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    },
    "eslint.validate": [
      "javascript",
      "html",
      "vue"
    ],
    "vetur.format.enable": true,
    "vetur.validation.template": true,
    "vetur.format.defaultFormatter.js": "none",
    "vetur.format.defaultFormatter.html": "js-beautify-html",
    "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
    "[vue]": {
      "editor.defaultFormatter": "octref.vetur"
    },
    "eslint.options": {
	    "extensions": [".js",".vue"]
    },
    "eslint.codeActionsOnSave.rules": null
```

遇到问题
1. 问题： 部分网站国内无法方案
解决： 暂时借用vpn处理
2. 问题：api为墙外网站一直访问失败、挂代理后浏览器可以、webpack proxy代理一直报错，猜测node无法连接v2ray的全局代理。尝试解决无果，api网站不支持jsnop，其他方案因为安全策略均跨域。
解决： 浪费了巨大的时间、找问题t t。使用类mock的方案处理、proxy检测到请求直接返回写死的json
3. 图片问题，部分图片无法加载
解决：换图片格式和访问路径
4. 手头无可用的现成框架 & 选型
解决： 尝试飞冰，网络原因放弃。采用vue cli + 一部分element ui 处理（图片icon）
5. 其他按个解决

思考
1. everying 接口必须有q 参数，打算下方增加一个select 默认是其他可访问组合，但是接口proxy 不通，不好调试。
2. axios 封装、往常封装、token考虑应该从服务器请求而不是本地配置
3. 使用常量枚举操作如： 收藏页、全部信息
4. scss 手写，本来想抽取下@mixin() 方便flex复用，但是没有多少时间
5. packge.json 有部分冗余未清理
6. 限于时间（zhixiu给了一个时间范围）+ 网络问题采用稳妥的vue2搭建、个人看来飞冰还是觉得更合适一些，vue3也可以尝试
