import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  // 其组件目录的相对路径
  '../components',
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /[A-Z]\w+\.(vue|js)$/
)

const install = (Vue) => {
  if (install.installed) {
    return;
  }
  install.installed = true;

  requireComponent.keys().forEach(fileName => {
    // 获取组件配置
    const componentConfig = requireComponent(fileName)
    // 获取组件的 PascalCase 命名
    const dirname = upperFirst(fileName.replace(/^\.\/(.*)\/(.*)\.\w+$/, '$1'));
    const filename = upperFirst(fileName.replace(/^\.\/(.*)\/(.*)\.\w+$/, '$2'));
    const componentName = upperFirst(
      camelCase(
        dirname === filename ? dirname : dirname + filename
      )
    )

    // 全局注册组件
    Vue.component(
      componentName,
      // 如果这个组件选项是通过 `export default` 导出的，
      // 那么就会优先使用 `.default`，
      // 否则回退到使用模块的根。
      componentConfig.default || componentConfig
    )
  })
}

export default install;
