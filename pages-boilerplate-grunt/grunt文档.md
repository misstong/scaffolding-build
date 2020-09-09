## 插件

grunt-contrib-uglify : 压缩js,css文件

grunt-contrib-watch : 监控并自动运行grunt任务


## HTML、css、js

模板通过swig_precompile处理
scss通过grunt-sass处理
js通过grunt-babel处理

这三个合成一个任务compile

## 拷贝静态资源

通过grunt-contrib-copy插件处理，任务是copy

## clean

通过grunt-contrib-clean处理，任务为clean

## useref

使用grunt-usemin插件，自动生成concat,cssmin,uglify任务，将合并压缩文件放至dist相关目录，导出命令为build

## 图片压缩

这个安装失败了，暂时只能拷贝



