# navigation

A navigation site.

See <https://536.github.io/navigation/>

Can be customized by passing a json file link.

When passed <https://cdn.jsdelivr.net/gh/536/my-configurations/navigation/navigation.json>

See <https://536.github.io/navigation/?json=https://cdn.jsdelivr.net/gh/536/my-configurations/navigation/navigation.json>

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## planning

- [x] 从指定json文件读取配置生成页面

- [ ] 生成页面的配置存储在localstorage，无json配置时默认读取（多条根据启动参数开启或者显示为list）

- [ ] 点击页面开关可以修改页面内容

- [ ] 修改后的页面可以主动保存为json文件
