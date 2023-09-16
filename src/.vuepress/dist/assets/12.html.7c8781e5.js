const l=JSON.parse('{"key":"v-36fe1dde","path":"/codenotes/Java/jvm/12.html","title":"JVM系列-第12章-垃圾回收器","lang":"zh-CN","frontmatter":{"title":"JVM系列-第12章-垃圾回收器","tags":["JVM","虚拟机"],"categories":["JVM","1.内存与垃圾回收篇"],"keywords":"JVM，虚拟机。","description":"JVM系列-第12章-垃圾回收器。","cover":"https://npm.elemecdn.com/lql_static@latest/logo/jvm.png","abbrlink":"7706d61d","head":[["meta",{"property":"og:url","content":"https://gitee.com/wxxxax/codenotes/Java/jvm/12.html"}],["meta",{"property":"og:site_name","content":"小明の学习笔记"}],["meta",{"property":"og:title","content":"JVM系列-第12章-垃圾回收器"}],["meta",{"property":"og:description","content":"JVM系列-第12章-垃圾回收器。"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://npm.elemecdn.com/lql_static@latest/logo/jvm.png"}],["meta",{"property":"og:updated_time","content":"2023-09-16T00:21:23.000Z"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"JVM系列-第12章-垃圾回收器"}],["meta",{"property":"article:tag","content":"JVM"}],["meta",{"property":"article:tag","content":"虚拟机"}],["meta",{"property":"article:modified_time","content":"2023-09-16T00:21:23.000Z"}]]},"excerpt":"","headers":[{"level":2,"title":"GC 分类与性能指标","slug":"gc-分类与性能指标","link":"#gc-分类与性能指标","children":[{"level":3,"title":"垃圾回收器概述","slug":"垃圾回收器概述","link":"#垃圾回收器概述","children":[]},{"level":3,"title":"垃圾回收器分类","slug":"垃圾回收器分类","link":"#垃圾回收器分类","children":[]},{"level":3,"title":"评估 GC 的性能指标","slug":"评估-gc-的性能指标","link":"#评估-gc-的性能指标","children":[]}]},{"level":2,"title":"不同的垃圾回收器概述","slug":"不同的垃圾回收器概述","link":"#不同的垃圾回收器概述","children":[{"level":3,"title":"垃圾收集器发展史","slug":"垃圾收集器发展史","link":"#垃圾收集器发展史","children":[]},{"level":3,"title":"7款经典的垃圾收集器","slug":"_7款经典的垃圾收集器","link":"#_7款经典的垃圾收集器","children":[]},{"level":3,"title":"垃圾收集器的组合关系","slug":"垃圾收集器的组合关系","link":"#垃圾收集器的组合关系","children":[]},{"level":3,"title":"查看默认垃圾收集器","slug":"查看默认垃圾收集器","link":"#查看默认垃圾收集器","children":[]}]},{"level":2,"title":"Serial 回收器：串行回收","slug":"serial-回收器-串行回收","link":"#serial-回收器-串行回收","children":[]},{"level":2,"title":"ParNew 回收器：并行回收","slug":"parnew-回收器-并行回收","link":"#parnew-回收器-并行回收","children":[]},{"level":2,"title":"Parallel 回收器：吞吐量优先","slug":"parallel-回收器-吞吐量优先","link":"#parallel-回收器-吞吐量优先","children":[]},{"level":2,"title":"CMS 回收器：低延迟","slug":"cms-回收器-低延迟","link":"#cms-回收器-低延迟","children":[{"level":3,"title":"CMS 回收器","slug":"cms-回收器","link":"#cms-回收器","children":[]},{"level":3,"title":"CMS 工作原理（过程）","slug":"cms-工作原理-过程","link":"#cms-工作原理-过程","children":[]},{"level":3,"title":"CMS分析","slug":"cms分析","link":"#cms分析","children":[]},{"level":3,"title":"CMS 的优点与弊端","slug":"cms-的优点与弊端","link":"#cms-的优点与弊端","children":[]},{"level":3,"title":"CMS 参数配置","slug":"cms-参数配置","link":"#cms-参数配置","children":[]},{"level":3,"title":"小结","slug":"小结","link":"#小结","children":[]},{"level":3,"title":"JDK 后续版本中 CMS 的变化","slug":"jdk-后续版本中-cms-的变化","link":"#jdk-后续版本中-cms-的变化","children":[]}]},{"level":2,"title":"G1 回收器：区域化分代式","slug":"g1-回收器-区域化分代式","link":"#g1-回收器-区域化分代式","children":[{"level":3,"title":"为什么还需要G1","slug":"为什么还需要g1","link":"#为什么还需要g1","children":[]},{"level":3,"title":"为什么名字叫Garbage First(G1)呢？","slug":"为什么名字叫garbage-first-g1-呢","link":"#为什么名字叫garbage-first-g1-呢","children":[]},{"level":3,"title":"G1 回收器的优势","slug":"g1-回收器的优势","link":"#g1-回收器的优势","children":[]},{"level":3,"title":"可预测的停顿时间模型","slug":"可预测的停顿时间模型","link":"#可预测的停顿时间模型","children":[]},{"level":3,"title":"G1 回收器的缺点","slug":"g1-回收器的缺点","link":"#g1-回收器的缺点","children":[]},{"level":3,"title":"G1 参数设置","slug":"g1-参数设置","link":"#g1-参数设置","children":[]},{"level":3,"title":"G1 收集器的常见操作步骤","slug":"g1-收集器的常见操作步骤","link":"#g1-收集器的常见操作步骤","children":[]},{"level":3,"title":"G1 的适用场景","slug":"g1-的适用场景","link":"#g1-的适用场景","children":[]},{"level":3,"title":"分区 Region","slug":"分区-region","link":"#分区-region","children":[]},{"level":3,"title":"G1 垃圾回收流程","slug":"g1-垃圾回收流程","link":"#g1-垃圾回收流程","children":[]},{"level":3,"title":"Remembered Set（记忆集）","slug":"remembered-set-记忆集","link":"#remembered-set-记忆集","children":[]},{"level":3,"title":"G1回收过程一：年轻代 GC","slug":"g1回收过程一-年轻代-gc","link":"#g1回收过程一-年轻代-gc","children":[]},{"level":3,"title":"G1回收过程二：并发标记过程","slug":"g1回收过程二-并发标记过程","link":"#g1回收过程二-并发标记过程","children":[]},{"level":3,"title":"G1回收过程三：混合回收过程","slug":"g1回收过程三-混合回收过程","link":"#g1回收过程三-混合回收过程","children":[]},{"level":3,"title":"G1 回收可选的过程四：Full GC","slug":"g1-回收可选的过程四-full-gc","link":"#g1-回收可选的过程四-full-gc","children":[]},{"level":3,"title":"G1补充","slug":"g1补充","link":"#g1补充","children":[]}]},{"level":2,"title":"垃圾回收器总结","slug":"垃圾回收器总结","link":"#垃圾回收器总结","children":[{"level":3,"title":"7 种垃圾回收器的比较","slug":"_7-种垃圾回收器的比较","link":"#_7-种垃圾回收器的比较","children":[]},{"level":3,"title":"怎么选择垃圾回收器","slug":"怎么选择垃圾回收器","link":"#怎么选择垃圾回收器","children":[]}]},{"level":2,"title":"GC 日志分析","slug":"gc-日志分析","link":"#gc-日志分析","children":[{"level":3,"title":"常用参数配置","slug":"常用参数配置","link":"#常用参数配置","children":[]},{"level":3,"title":"GC 日志补充说明","slug":"gc-日志补充说明","link":"#gc-日志补充说明","children":[]},{"level":3,"title":"常用日志分析工具","slug":"常用日志分析工具","link":"#常用日志分析工具","children":[]}]},{"level":2,"title":"垃圾回收器的新发展","slug":"垃圾回收器的新发展","link":"#垃圾回收器的新发展","children":[{"level":3,"title":"垃圾回收器的发展过程","slug":"垃圾回收器的发展过程","link":"#垃圾回收器的发展过程","children":[]},{"level":3,"title":"Shenandoah GC","slug":"shenandoah-gc","link":"#shenandoah-gc","children":[]},{"level":3,"title":"令人震惊、革命性的 ZGC","slug":"令人震惊、革命性的-zgc","link":"#令人震惊、革命性的-zgc","children":[]},{"level":3,"title":"面向大堆的 AliGC","slug":"面向大堆的-aligc","link":"#面向大堆的-aligc","children":[]}]}],"git":{"createdTime":1694823683000,"updatedTime":1694823683000,"contributors":[{"name":"Wang.Xiaoming","email":"vipzongzheng@gmail.com","commits":1}]},"readingTime":{"minutes":54.61,"words":16383},"filePathRelative":"codenotes/Java/jvm/12.md","localizedDate":"2023年9月16日"}');export{l as data};
