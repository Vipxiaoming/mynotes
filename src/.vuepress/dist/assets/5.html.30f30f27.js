const l=JSON.parse('{"key":"v-fc9d162a","path":"/codenotes/Java/jvm/5.html","title":"JVM系列-第5章-堆","lang":"zh-CN","frontmatter":{"title":"JVM系列-第5章-堆","tags":["JVM","虚拟机"],"categories":["JVM","1.内存与垃圾回收篇"],"keywords":"JVM，虚拟机。","description":"JVM系列-第5章-堆。","cover":"https://npm.elemecdn.com/lql_static@latest/logo/jvm.png","abbrlink":"50ac3a1c","head":[["meta",{"property":"og:url","content":"https://gitee.com/wxxxax/codenotes/Java/jvm/5.html"}],["meta",{"property":"og:site_name","content":"小明の学习笔记"}],["meta",{"property":"og:title","content":"JVM系列-第5章-堆"}],["meta",{"property":"og:description","content":"JVM系列-第5章-堆。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://npm.elemecdn.com/lql_static@latest/logo/jvm.png"}],["meta",{"property":"og:updated_time","content":"2023-09-16T00:21:23.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"JVM系列-第5章-堆"}],["meta",{"property":"article:tag","content":"JVM"}],["meta",{"property":"article:tag","content":"虚拟机"}],["meta",{"property":"article:modified_time","content":"2023-09-16T00:21:23.000Z"}]]},"excerpt":"","headers":[{"level":2,"title":"堆的核心概述","slug":"堆的核心概述","link":"#堆的核心概述","children":[{"level":3,"title":"堆与进程","slug":"堆与进程","link":"#堆与进程","children":[]},{"level":3,"title":"堆内存细分","slug":"堆内存细分","link":"#堆内存细分","children":[]}]},{"level":2,"title":"JVisualVM可视化查看堆内存","slug":"jvisualvm可视化查看堆内存","link":"#jvisualvm可视化查看堆内存","children":[]},{"level":2,"title":"设置堆内存大小与 OOM","slug":"设置堆内存大小与-oom","link":"#设置堆内存大小与-oom","children":[{"level":3,"title":"设置堆内存","slug":"设置堆内存","link":"#设置堆内存","children":[]},{"level":3,"title":"OOM","slug":"oom","link":"#oom","children":[]}]},{"level":2,"title":"年轻代与老年代","slug":"年轻代与老年代","link":"#年轻代与老年代","children":[]},{"level":2,"title":"图解对象分配过程","slug":"图解对象分配过程","link":"#图解对象分配过程","children":[{"level":3,"title":"图解对象分配（一般情况）","slug":"图解对象分配-一般情况","link":"#图解对象分配-一般情况","children":[]},{"level":3,"title":"特殊情况说明","slug":"特殊情况说明","link":"#特殊情况说明","children":[]},{"level":3,"title":"常用调优工具","slug":"常用调优工具","link":"#常用调优工具","children":[]}]},{"level":2,"title":"GC分类","slug":"gc分类","link":"#gc分类","children":[{"level":3,"title":"Young GC","slug":"young-gc","link":"#young-gc","children":[]},{"level":3,"title":"Major/Full GC","slug":"major-full-gc","link":"#major-full-gc","children":[]},{"level":3,"title":"GC日志分析","slug":"gc日志分析","link":"#gc日志分析","children":[]}]},{"level":2,"title":"堆空间分代思想","slug":"堆空间分代思想","link":"#堆空间分代思想","children":[]},{"level":2,"title":"对象内存分配策略","slug":"对象内存分配策略","link":"#对象内存分配策略","children":[]},{"level":2,"title":"TLAB为对象分配内存（保证线程安全）","slug":"tlab为对象分配内存-保证线程安全","link":"#tlab为对象分配内存-保证线程安全","children":[{"level":3,"title":"为什么有 TLAB","slug":"为什么有-tlab","link":"#为什么有-tlab","children":[]},{"level":3,"title":"什么是 TLAB","slug":"什么是-tlab","link":"#什么是-tlab","children":[]},{"level":3,"title":"TLAB再说明","slug":"tlab再说明","link":"#tlab再说明","children":[]}]},{"level":2,"title":"堆空间参数设置","slug":"堆空间参数设置","link":"#堆空间参数设置","children":[{"level":3,"title":"常用参数设置","slug":"常用参数设置","link":"#常用参数设置","children":[]},{"level":3,"title":"空间分配担保","slug":"空间分配担保","link":"#空间分配担保","children":[]}]},{"level":2,"title":"堆是分配对象的唯一选择么？","slug":"堆是分配对象的唯一选择么","link":"#堆是分配对象的唯一选择么","children":[{"level":3,"title":"逃逸分析","slug":"逃逸分析","link":"#逃逸分析","children":[]},{"level":3,"title":"代码优化","slug":"代码优化","link":"#代码优化","children":[]},{"level":3,"title":"栈上分配","slug":"栈上分配","link":"#栈上分配","children":[]},{"level":3,"title":"同步省略（同步消除）","slug":"同步省略-同步消除","link":"#同步省略-同步消除","children":[]},{"level":3,"title":"标量替换","slug":"标量替换","link":"#标量替换","children":[]},{"level":3,"title":"逃逸分析的不足","slug":"逃逸分析的不足","link":"#逃逸分析的不足","children":[]}]},{"level":2,"title":"小结","slug":"小结","link":"#小结","children":[]}],"git":{"createdTime":1694823683000,"updatedTime":1694823683000,"contributors":[{"name":"Wang.Xiaoming","email":"vipzongzheng@gmail.com","commits":1}]},"readingTime":{"minutes":34.18,"words":10254},"filePathRelative":"codenotes/Java/jvm/5.md","localizedDate":"2023年9月16日"}');export{l as data};