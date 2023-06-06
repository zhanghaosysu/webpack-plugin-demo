class MyDemoPlugin {
  apply(compiler) {
    //在done（构建完成后执行）这个hook上注册自定义事件
    compiler.hooks.done.tap("DemoPlugin", () => {
      console.log("DemoPlugin：编译结束了");
    });
  }
}

module.exports = MyDemoPlugin;
