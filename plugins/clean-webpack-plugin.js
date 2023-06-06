class CleanWebpackPlugin {
    constructor(options) {
      this.options = options;
    }
    apply(compiler) {
        // 获取输出路径，从 webpack.config.js 配置中的 output 字段拿到配置的输出路径
        const outputPath = compiler.options.output.path
        // webpack提供的文件操作
        const fs = compiler.outputFileSystem
        // emit 是 compiler 的一个 AsyncSeriesHook，它在输出 asset 到 output 目录之前执行
        compiler.hooks.emit.tapAsync('emit', (compilation, callback) => {
            this.removeFiles(fs, outputPath);
            console.log(this.options, '我是传进来的参数');
            callback();
        })
    }
    removeFiles(fs, filePath) {
        // 读取目录下的内容，包括文件和文件夹
        console.log(filePath, 'filePath');
        const files = fs.readdirSync(filePath)
        console.log(files, 'files----');
        files.forEach(file => {
            const path = `${filePath}/${file}`
            const fileStat = fs.statSync(path)
            // 判断是否为文件夹，如果是，则递归
            if (fileStat.isDirectory()) {
                this.removeFiles(fs, path)
            } else {
                //是文件，则删除
                fs.unlinkSync(path)
            }
        })
    }
}

module.exports = CleanWebpackPlugin
