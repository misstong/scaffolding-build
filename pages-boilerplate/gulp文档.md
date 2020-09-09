## 入口

gulpfile导出了三个命令：clean,build,develop

## 命令

clean: 运行gulp clean会清空 dist和tmp目录

compile： 编译样式、模板、脚本

serve：启动开发服务器，监听tmp、src、public三个目录，同时监听样式脚本模板，有更改重新编译

develop：编译后启动开发服务器

build： 清空， 编译，处理引用文件，静态资源压缩

## 插件

gulp-sass: 编译scss文件，以_开头的文件不会生成对应的css，如果某个scss引用了其他文件，会合并

node_modules相关链接会在useref中被替换成合并后的文件