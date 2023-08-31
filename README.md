# 在线网页doc
[链接](https://uestcbytedance.github.io/)

## 本地运行方式
```sh
npm run docs:dev
```
## 文件目录结构
```sh
├─ docs
│  ├─ .vuepress  // 存放全局的配置、组件、静态资源等。
│  │  └─ public
│  │  │    └─ images  //存放图片
│  │  └─ config.ts  // 配置文件的入口文件
│  ├─ pages  // 存放页面
│  └─ README.md     //文档的入口页面。
├─ .gitignore
└─ package.json
```