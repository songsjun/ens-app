## 部署说明

1. checkout out `https://github.com/siyushin/ui` 与当前项目在同一级目录
2. 进入`../ui`，执行：

```shell
yarn install
yarn build
yarn link
```

3. 在当前项目下执行后，`./build`路径下就是可部署的静态网页相关文件

```shell
yarn link @ensdomains/ui
yarn install
yarn ready
yarn build
```

## 运营相关

1. `/d/banners.json`是首页通知栏内容。
