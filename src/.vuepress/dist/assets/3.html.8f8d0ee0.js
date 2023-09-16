import{_ as t}from"./_plugin-vue_export-helper.cdc0426e.js";import{o,c as l,a as s,e as n,b as p,d as a,r as c}from"./app.056f2231.js";const r={},i=a('<blockquote><p>此章把运行时数据区里比较少的地方讲一下。虚拟机栈，堆，方法区这些地方后续再讲。</p></blockquote><h1 id="运行时数据区概述及线程" tabindex="-1"><a class="header-anchor" href="#运行时数据区概述及线程" aria-hidden="true">#</a> 运行时数据区概述及线程</h1><h2 id="前言" tabindex="-1"><a class="header-anchor" href="#前言" aria-hidden="true">#</a> 前言</h2><p>本节主要讲的是运行时数据区，也就是下图这部分，它是在类加载完成后的阶段</p><img src="https://npm.elemecdn.com/youthlql@1.0.8/JVM/chapter_003/0001.png"><p>当我们通过前面的：类的加载 --&gt; 验证 --&gt; 准备 --&gt; 解析 --&gt; 初始化，这几个阶段完成后，就会用到执行引擎对我们的类进行使用，同时执行引擎将会使用到我们运行时数据区</p><img src="https://npm.elemecdn.com/youthlql@1.0.8/JVM/chapter_003/0002.png"><p>类比一下也就是大厨做饭，我们把大厨后面的东西（切好的菜，刀，调料），比作是运行时数据区。而厨师可以类比于执行引擎，将通过准备的东西进行制作成精美的菜品。</p><img src="https://npm.elemecdn.com/youthlql@1.0.8/JVM/chapter_003/0003.png"><h2 id="运行时数据区结构" tabindex="-1"><a class="header-anchor" href="#运行时数据区结构" aria-hidden="true">#</a> 运行时数据区结构</h2><h3 id="运行时数据区与内存" tabindex="-1"><a class="header-anchor" href="#运行时数据区与内存" aria-hidden="true">#</a> 运行时数据区与内存</h3><ol><li><p>内存是非常重要的系统资源，是硬盘和CPU的中间仓库及桥梁，承载着操作系统和应用程序的实时运行。JVM内存布局规定了Java在运行过程中内存申请、分配、管理的策略，保证了JVM的高效稳定运行。<strong>不同的JVM对于内存的划分方式和管理机制存在着部分差异</strong>。结合JVM虚拟机规范，来探讨一下经典的JVM内存布局。</p></li><li><p>我们通过磁盘或者网络IO得到的数据，都需要先加载到内存中，然后CPU从内存中获取数据进行读取，也就是说内存充当了CPU和磁盘之间的桥梁</p></li></ol><blockquote><p>下图来自阿里巴巴手册JDK8</p></blockquote><img src="https://npm.elemecdn.com/youthlql@1.0.8/JVM/chapter_003/0004.jpg"><h3 id="线程的内存空间" tabindex="-1"><a class="header-anchor" href="#线程的内存空间" aria-hidden="true">#</a> 线程的内存空间</h3><ol><li><p>Java虚拟机定义了若干种程序运行期间会使用到的运行时数据区：其中有一些会随着虚拟机启动而创建，随着虚拟机退出而销毁。另外一些则是与线程一一对应的，这些与线程对应的数据区域会随着线程开始和结束而创建和销毁。</p></li><li><p>灰色的为单独线程私有的，红色的为多个线程共享的。即：</p><ul><li>线程独有：独立包括程序计数器、栈、本地方法栈</li><li>线程间共享：堆、堆外内存（永久代或元空间、代码缓存）</li></ul></li></ol><img src="https://npm.elemecdn.com/youthlql@1.0.8/JVM/chapter_003/0005.png"><h3 id="runtime类" tabindex="-1"><a class="header-anchor" href="#runtime类" aria-hidden="true">#</a> Runtime类</h3><p><strong>每个JVM只有一个Runtime实例</strong>。即为运行时环境，相当于内存结构的中间的那个框框：运行时环境。</p><img src="https://npm.elemecdn.com/youthlql@1.0.8/JVM/chapter_003/0006.png"><h2 id="线程" tabindex="-1"><a class="header-anchor" href="#线程" aria-hidden="true">#</a> 线程</h2><h3 id="jvm-线程" tabindex="-1"><a class="header-anchor" href="#jvm-线程" aria-hidden="true">#</a> JVM 线程</h3><ol><li>线程是一个程序里的运行单元。JVM允许一个应用有多个线程并行的执行</li><li><strong>在Hotspot JVM里，每个线程都与操作系统的本地线程直接映射</strong><ul><li>当一个Java线程准备好执行以后，此时一个操作系统的本地线程也同时创建。Java线程执行终止后，本地线程也会回收</li></ul></li><li>操作系统负责将线程安排调度到任何一个可用的CPU上。一旦本地线程初始化成功，它就会调用Java线程中的run()方法</li></ol><blockquote><p>关于线程，并发可以看笔者的Java并发系列</p></blockquote><h3 id="jvm-系统线程" tabindex="-1"><a class="header-anchor" href="#jvm-系统线程" aria-hidden="true">#</a> JVM 系统线程</h3><ul><li><p>如果你使用jconsole或者是任何一个调试工具，都能看到在后台有许多线程在运行。这些后台线程不包括调用<code>public static void main(String[])</code>的main线程以及所有这个main线程自己创建的线程。</p></li><li><p>这些主要的后台系统线程在Hotspot JVM里主要是以下几个：</p></li></ul><ol><li><strong>虚拟机线程</strong>：这种线程的操作是需要JVM达到安全点才会出现。这些操作必须在不同的线程中发生的原因是他们都需要JVM达到安全点，这样堆才不会变化。这种线程的执行类型括&quot;stop-the-world&quot;的垃圾收集，线程栈收集，线程挂起以及偏向锁撤销</li><li><strong>周期任务线程</strong>：这种线程是时间周期事件的体现（比如中断），他们一般用于周期性操作的调度执行</li><li><strong>GC线程</strong>：这种线程对在JVM里不同种类的垃圾收集行为提供了支持</li><li><strong>编译线程</strong>：这种线程在运行时会将字节码编译成到本地代码</li><li><strong>信号调度线程</strong>：这种线程接收信号并发送给JVM，在它内部通过调用适当的方法进行处理</li></ol><h1 id="程序计数器-pc寄存器" tabindex="-1"><a class="header-anchor" href="#程序计数器-pc寄存器" aria-hidden="true">#</a> 程序计数器(PC寄存器)</h1><h2 id="pc寄存器介绍" tabindex="-1"><a class="header-anchor" href="#pc寄存器介绍" aria-hidden="true">#</a> PC寄存器介绍</h2>',29),k={href:"https://docs.oracle.com/javase/specs/jvms/se8/html/index.html",target:"_blank",rel:"noopener noreferrer"},u=a(`<img src="https://npm.elemecdn.com/youthlql@1.0.8/JVM/chapter_003/0007.png"><ol><li>JVM中的程序计数寄存器（Program Counter Register）中，Register的命名源于CPU的寄存器，<strong>寄存器存储指令相关的现场信息</strong>。CPU只有把数据装载到寄存器才能够运行。</li><li>这里，并非是广义上所指的物理寄存器，或许将其翻译为PC计数器（或指令计数器）会更加贴切（也称为程序钩子），并且也不容易引起一些不必要的误会。<strong>JVM中的PC寄存器是对物理PC寄存器的一种抽象模拟</strong>。</li><li>它是一块很小的内存空间，几乎可以忽略不记。也是运行速度最快的存储区域。</li><li>在JVM规范中，每个线程都有它自己的程序计数器，是线程私有的，生命周期与线程的生命周期保持一致。</li><li>任何时间一个线程都只有一个方法在执行，也就是所谓的<strong>当前方法</strong>。程序计数器会存储当前线程正在执行的Java方法的JVM指令地址；或者，如果是在执行native方法，则是未指定值（undefned）。</li><li>它是<strong>程序控制流</strong>的指示器，分支、循环、跳转、异常处理、线程恢复等基础功能都需要依赖这个计数器来完成。</li><li>字节码解释器工作时就是通过改变这个计数器的值来选取下一条需要执行的字节码指令。</li><li>它是<strong>唯一一个</strong>在Java虚拟机规范中没有规定任何OutofMemoryError情况的区域。</li></ol><h2 id="pc寄存器的作用" tabindex="-1"><a class="header-anchor" href="#pc寄存器的作用" aria-hidden="true">#</a> PC寄存器的作用</h2><p>PC寄存器用来存储指向下一条指令的地址，也即将要执行的指令代码。由执行引擎读取下一条指令，并执行该指令。</p><img src="https://npm.elemecdn.com/youthlql@1.0.8/JVM/chapter_003/0008.png"><h2 id="举例" tabindex="-1"><a class="header-anchor" href="#举例" aria-hidden="true">#</a> 举例</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PCRegisterTest</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> k <span class="token operator">=</span> i <span class="token operator">+</span> j<span class="token punctuation">;</span>

        <span class="token class-name">String</span> s <span class="token operator">=</span> <span class="token string">&quot;abc&quot;</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>k<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>查看字节码</p>`,8),m={href:"https://blog.csdn.net/21aspnet/article/details/88351875",target:"_blank",rel:"noopener noreferrer"},d=a(`<div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Classfile</span> <span class="token operator">/</span><span class="token class-name">F</span><span class="token operator">:</span><span class="token operator">/</span><span class="token class-name">IDEAWorkSpaceSourceCode</span><span class="token operator">/</span><span class="token class-name">JVMDemo</span><span class="token operator">/</span>out<span class="token operator">/</span>production<span class="token operator">/</span>chapter04<span class="token operator">/</span>com<span class="token operator">/</span>atguigu<span class="token operator">/</span>java<span class="token operator">/</span><span class="token class-name">PCRegisterTest</span><span class="token punctuation">.</span><span class="token keyword">class</span>
  <span class="token class-name">Last</span> modified <span class="token number">2020</span><span class="token operator">-</span><span class="token number">11</span><span class="token operator">-</span><span class="token number">2</span><span class="token punctuation">;</span> size <span class="token number">675</span> bytes
  <span class="token constant">MD5</span> checksum <span class="token number">53</span>b3ef104479ec9e9b7ce5319e5881d3
  <span class="token class-name">Compiled</span> from <span class="token string">&quot;PCRegisterTest.java&quot;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name"><span class="token namespace">com<span class="token punctuation">.</span>atguigu<span class="token punctuation">.</span>java<span class="token punctuation">.</span></span>PCRegisterTest</span>
  minor version<span class="token operator">:</span> <span class="token number">0</span>
  major version<span class="token operator">:</span> <span class="token number">52</span>
  flags<span class="token operator">:</span> <span class="token constant">ACC_PUBLIC</span><span class="token punctuation">,</span> <span class="token constant">ACC_SUPER</span>
<span class="token class-name">Constant</span> pool<span class="token operator">:</span>
   #<span class="token number">1</span> <span class="token operator">=</span> <span class="token class-name">Methodref</span>          #<span class="token number">6.</span>#<span class="token number">26</span>         <span class="token comment">// java/lang/Object.&quot;&lt;init&gt;&quot;:()V</span>
   #<span class="token number">2</span> <span class="token operator">=</span> <span class="token class-name">String</span>             #<span class="token number">27</span>            <span class="token comment">// abc</span>
   #<span class="token number">3</span> <span class="token operator">=</span> <span class="token class-name">Fieldref</span>           #<span class="token number">28.</span>#<span class="token number">29</span>        <span class="token comment">// java/lang/System.out:Ljava/io/PrintStream;</span>
   #<span class="token number">4</span> <span class="token operator">=</span> <span class="token class-name">Methodref</span>          #<span class="token number">30.</span>#<span class="token number">31</span>        <span class="token comment">// java/io/PrintStream.println:(I)V</span>
   #<span class="token number">5</span> <span class="token operator">=</span> <span class="token class-name">Class</span>              #<span class="token number">32</span>            <span class="token comment">// com/atguigu/java/PCRegisterTest</span>
   #<span class="token number">6</span> <span class="token operator">=</span> <span class="token class-name">Class</span>              #<span class="token number">33</span>            <span class="token comment">// java/lang/Object</span>
   #<span class="token number">7</span> <span class="token operator">=</span> <span class="token class-name">Utf8</span>               <span class="token generics"><span class="token punctuation">&lt;</span>init<span class="token punctuation">&gt;</span></span>
   #<span class="token number">8</span> <span class="token operator">=</span> <span class="token class-name">Utf8</span>               <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token class-name">V</span>
   #<span class="token number">9</span> <span class="token operator">=</span> <span class="token class-name">Utf8</span>               <span class="token class-name">Code</span>
  #<span class="token number">10</span> <span class="token operator">=</span> <span class="token class-name">Utf8</span>               <span class="token class-name">LineNumberTable</span>
  #<span class="token number">11</span> <span class="token operator">=</span> <span class="token class-name">Utf8</span>               <span class="token class-name">LocalVariableTable</span>
  #<span class="token number">12</span> <span class="token operator">=</span> <span class="token class-name">Utf8</span>               <span class="token keyword">this</span>
  #<span class="token number">13</span> <span class="token operator">=</span> <span class="token class-name">Utf8</span>               <span class="token class-name">Lcom</span><span class="token operator">/</span>atguigu<span class="token operator">/</span>java<span class="token operator">/</span><span class="token class-name">PCRegisterTest</span><span class="token punctuation">;</span>
  #<span class="token number">14</span> <span class="token operator">=</span> <span class="token class-name">Utf8</span>               main
  #<span class="token number">15</span> <span class="token operator">=</span> <span class="token class-name">Utf8</span>               <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token class-name">Ljava</span><span class="token operator">/</span>lang<span class="token operator">/</span><span class="token class-name">String</span><span class="token punctuation">;</span><span class="token punctuation">)</span><span class="token class-name">V</span>
  #<span class="token number">16</span> <span class="token operator">=</span> <span class="token class-name">Utf8</span>               args
  #<span class="token number">17</span> <span class="token operator">=</span> <span class="token class-name">Utf8</span>               <span class="token punctuation">[</span><span class="token class-name">Ljava</span><span class="token operator">/</span>lang<span class="token operator">/</span><span class="token class-name">String</span><span class="token punctuation">;</span>
  #<span class="token number">18</span> <span class="token operator">=</span> <span class="token class-name">Utf8</span>               i
  #<span class="token number">19</span> <span class="token operator">=</span> <span class="token class-name">Utf8</span>               <span class="token class-name">I</span>
  #<span class="token number">20</span> <span class="token operator">=</span> <span class="token class-name">Utf8</span>               j
  #<span class="token number">21</span> <span class="token operator">=</span> <span class="token class-name">Utf8</span>               k
  #<span class="token number">22</span> <span class="token operator">=</span> <span class="token class-name">Utf8</span>               s
  #<span class="token number">23</span> <span class="token operator">=</span> <span class="token class-name">Utf8</span>               <span class="token class-name">Ljava</span><span class="token operator">/</span>lang<span class="token operator">/</span><span class="token class-name">String</span><span class="token punctuation">;</span>
  #<span class="token number">24</span> <span class="token operator">=</span> <span class="token class-name">Utf8</span>               <span class="token class-name">SourceFile</span>
  #<span class="token number">25</span> <span class="token operator">=</span> <span class="token class-name">Utf8</span>               <span class="token class-name">PCRegisterTest</span><span class="token punctuation">.</span>java
  #<span class="token number">26</span> <span class="token operator">=</span> <span class="token class-name">NameAndType</span>        #<span class="token number">7</span><span class="token operator">:</span>#<span class="token number">8</span>          <span class="token comment">// &quot;&lt;init&gt;&quot;:()V</span>
  #<span class="token number">27</span> <span class="token operator">=</span> <span class="token class-name">Utf8</span>               abc
  #<span class="token number">28</span> <span class="token operator">=</span> <span class="token class-name">Class</span>              #<span class="token number">34</span>            <span class="token comment">// java/lang/System</span>
  #<span class="token number">29</span> <span class="token operator">=</span> <span class="token class-name">NameAndType</span>        #<span class="token number">35</span><span class="token operator">:</span>#<span class="token number">36</span>        <span class="token comment">// out:Ljava/io/PrintStream;</span>
  #<span class="token number">30</span> <span class="token operator">=</span> <span class="token class-name">Class</span>              #<span class="token number">37</span>            <span class="token comment">// java/io/PrintStream</span>
  #<span class="token number">31</span> <span class="token operator">=</span> <span class="token class-name">NameAndType</span>        #<span class="token number">38</span><span class="token operator">:</span>#<span class="token number">39</span>        <span class="token comment">// println:(I)V</span>
  #<span class="token number">32</span> <span class="token operator">=</span> <span class="token class-name">Utf8</span>               com<span class="token operator">/</span>atguigu<span class="token operator">/</span>java<span class="token operator">/</span><span class="token class-name">PCRegisterTest</span>
  #<span class="token number">33</span> <span class="token operator">=</span> <span class="token class-name">Utf8</span>               java<span class="token operator">/</span>lang<span class="token operator">/</span><span class="token class-name">Object</span>
  #<span class="token number">34</span> <span class="token operator">=</span> <span class="token class-name">Utf8</span>               java<span class="token operator">/</span>lang<span class="token operator">/</span><span class="token class-name">System</span>
  #<span class="token number">35</span> <span class="token operator">=</span> <span class="token class-name">Utf8</span>               out
  #<span class="token number">36</span> <span class="token operator">=</span> <span class="token class-name">Utf8</span>               <span class="token class-name">Ljava</span><span class="token operator">/</span>io<span class="token operator">/</span><span class="token class-name">PrintStream</span><span class="token punctuation">;</span>
  #<span class="token number">37</span> <span class="token operator">=</span> <span class="token class-name">Utf8</span>               java<span class="token operator">/</span>io<span class="token operator">/</span><span class="token class-name">PrintStream</span>
  #<span class="token number">38</span> <span class="token operator">=</span> <span class="token class-name">Utf8</span>               println
  #<span class="token number">39</span> <span class="token operator">=</span> <span class="token class-name">Utf8</span>               <span class="token punctuation">(</span><span class="token class-name">I</span><span class="token punctuation">)</span><span class="token class-name">V</span>
<span class="token punctuation">{</span>
  <span class="token keyword">public</span> <span class="token class-name"><span class="token namespace">com<span class="token punctuation">.</span>atguigu<span class="token punctuation">.</span>java<span class="token punctuation">.</span></span>PCRegisterTest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    descriptor<span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token class-name">V</span>
    flags<span class="token operator">:</span> <span class="token constant">ACC_PUBLIC</span>
    <span class="token class-name">Code</span><span class="token operator">:</span>
      stack<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span> locals<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span> args_size<span class="token operator">=</span><span class="token number">1</span>
         <span class="token number">0</span><span class="token operator">:</span> aload_0
         <span class="token number">1</span><span class="token operator">:</span> invokespecial #<span class="token number">1</span>                  <span class="token comment">// Method java/lang/Object.&quot;&lt;init&gt;&quot;:()V</span>
         <span class="token number">4</span><span class="token operator">:</span> <span class="token keyword">return</span>
      <span class="token class-name">LineNumberTable</span><span class="token operator">:</span>
        line <span class="token number">7</span><span class="token operator">:</span> <span class="token number">0</span>
      <span class="token class-name">LocalVariableTable</span><span class="token operator">:</span>
        <span class="token class-name">Start</span>  <span class="token class-name">Length</span>  <span class="token class-name">Slot</span>  <span class="token class-name">Name</span>   <span class="token class-name">Signature</span>
            <span class="token number">0</span>       <span class="token number">5</span>     <span class="token number">0</span>  <span class="token keyword">this</span>   <span class="token class-name">Lcom</span><span class="token operator">/</span>atguigu<span class="token operator">/</span>java<span class="token operator">/</span><span class="token class-name">PCRegisterTest</span><span class="token punctuation">;</span>

  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>lang<span class="token punctuation">.</span></span>String</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    descriptor<span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token class-name">Ljava</span><span class="token operator">/</span>lang<span class="token operator">/</span><span class="token class-name">String</span><span class="token punctuation">;</span><span class="token punctuation">)</span><span class="token class-name">V</span>
    flags<span class="token operator">:</span> <span class="token constant">ACC_PUBLIC</span><span class="token punctuation">,</span> <span class="token constant">ACC_STATIC</span>
    <span class="token class-name">Code</span><span class="token operator">:</span>
      stack<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">,</span> locals<span class="token operator">=</span><span class="token number">5</span><span class="token punctuation">,</span> args_size<span class="token operator">=</span><span class="token number">1</span>
         <span class="token number">0</span><span class="token operator">:</span> bipush        <span class="token number">10</span>
         <span class="token number">2</span><span class="token operator">:</span> istore_1
         <span class="token number">3</span><span class="token operator">:</span> bipush        <span class="token number">20</span>
         <span class="token number">5</span><span class="token operator">:</span> istore_2
         <span class="token number">6</span><span class="token operator">:</span> iload_1
         <span class="token number">7</span><span class="token operator">:</span> iload_2
         <span class="token number">8</span><span class="token operator">:</span> iadd
         <span class="token number">9</span><span class="token operator">:</span> istore_3
        <span class="token number">10</span><span class="token operator">:</span> ldc           #<span class="token number">2</span>                  <span class="token comment">// String abc</span>
        <span class="token number">12</span><span class="token operator">:</span> astore        <span class="token number">4</span>
        <span class="token number">14</span><span class="token operator">:</span> getstatic     #<span class="token number">3</span>                  <span class="token comment">// Field java/lang/System.out:Ljava/io/PrintStream;</span>
        <span class="token number">17</span><span class="token operator">:</span> iload_1
        <span class="token number">18</span><span class="token operator">:</span> invokevirtual #<span class="token number">4</span>                  <span class="token comment">// Method java/io/PrintStream.println:(I)V</span>
        <span class="token number">21</span><span class="token operator">:</span> getstatic     #<span class="token number">3</span>                  <span class="token comment">// Field java/lang/System.out:Ljava/io/PrintStream;</span>
        <span class="token number">24</span><span class="token operator">:</span> iload_3
        <span class="token number">25</span><span class="token operator">:</span> invokevirtual #<span class="token number">4</span>                  <span class="token comment">// Method java/io/PrintStream.println:(I)V</span>
        <span class="token number">28</span><span class="token operator">:</span> <span class="token keyword">return</span>
      <span class="token class-name">LineNumberTable</span><span class="token operator">:</span>
        line <span class="token number">10</span><span class="token operator">:</span> <span class="token number">0</span>
        line <span class="token number">11</span><span class="token operator">:</span> <span class="token number">3</span>
        line <span class="token number">12</span><span class="token operator">:</span> <span class="token number">6</span>
        line <span class="token number">14</span><span class="token operator">:</span> <span class="token number">10</span>
        line <span class="token number">15</span><span class="token operator">:</span> <span class="token number">14</span>
        line <span class="token number">16</span><span class="token operator">:</span> <span class="token number">21</span>
        line <span class="token number">18</span><span class="token operator">:</span> <span class="token number">28</span>
      <span class="token class-name">LocalVariableTable</span><span class="token operator">:</span>
        <span class="token class-name">Start</span>  <span class="token class-name">Length</span>  <span class="token class-name">Slot</span>  <span class="token class-name">Name</span>   <span class="token class-name">Signature</span>
            <span class="token number">0</span>      <span class="token number">29</span>     <span class="token number">0</span>  args   <span class="token punctuation">[</span><span class="token class-name">Ljava</span><span class="token operator">/</span>lang<span class="token operator">/</span><span class="token class-name">String</span><span class="token punctuation">;</span>
            <span class="token number">3</span>      <span class="token number">26</span>     <span class="token number">1</span>     i   <span class="token class-name">I</span>
            <span class="token number">6</span>      <span class="token number">23</span>     <span class="token number">2</span>     j   <span class="token class-name">I</span>
           <span class="token number">10</span>      <span class="token number">19</span>     <span class="token number">3</span>     k   <span class="token class-name">I</span>
           <span class="token number">14</span>      <span class="token number">15</span>     <span class="token number">4</span>     s   <span class="token class-name">Ljava</span><span class="token operator">/</span>lang<span class="token operator">/</span><span class="token class-name">String</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token class-name">SourceFile</span><span class="token operator">:</span> <span class="token string">&quot;PCRegisterTest.java&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>左边的数字代表<strong>指令地址（指令偏移）</strong>，即 PC 寄存器中可能存储的值，然后执行引擎读取 PC 寄存器中的值，并执行该指令</li></ul><img src="https://npm.elemecdn.com/youthlql@1.0.8/JVM/chapter_003/0009.png"><h2 id="两个面试题" tabindex="-1"><a class="header-anchor" href="#两个面试题" aria-hidden="true">#</a> 两个面试题</h2><p><strong>使用PC寄存器存储字节码指令地址有什么用呢？<strong>或者问</strong>为什么使用 PC 寄存器来记录当前线程的执行地址呢？</strong></p><ol><li><p>因为CPU需要不停的切换各个线程，这时候切换回来以后，就得知道接着从哪开始继续执行</p></li><li><p>JVM的字节码解释器就需要通过改变PC寄存器的值来明确下一条应该执行什么样的字节码指令</p></li></ol><img src="https://npm.elemecdn.com/youthlql@1.0.8/JVM/chapter_003/0010.png"><p><strong>PC寄存器为什么被设定为私有的？</strong></p><ol><li>我们都知道所谓的多线程在一个特定的时间段内只会执行其中某一个线程的方法，CPU会不停地做任务切换，这样必然导致经常中断或恢复，如何保证分毫无差呢？<strong>为了能够准确地记录各个线程正在执行的当前字节码指令地址，最好的办法自然是为每一个线程都分配一个PC寄存器</strong>，这样一来各个线程之间便可以进行独立计算，从而不会出现相互干扰的情况。</li><li>由于CPU时间片轮限制，众多线程在并发执行过程中，任何一个确定的时刻，一个处理器或者多核处理器中的一个内核，只会执行某个线程中的一条指令。</li><li>这样必然导致经常中断或恢复，如何保证分毫无差呢？每个线程在创建后，都会产生自己的程序计数器和栈帧，程序计数器在各个线程之间互不影响。</li></ol><blockquote><p>注意并行和并发的区别，笔者的并发系列有讲</p></blockquote><h2 id="cpu-时间片" tabindex="-1"><a class="header-anchor" href="#cpu-时间片" aria-hidden="true">#</a> CPU 时间片</h2><ol><li><p>CPU时间片即CPU分配给各个程序的时间，每个线程被分配一个时间段，称作它的时间片。</p></li><li><p>在宏观上：我们可以同时打开多个应用程序，每个程序并行不悖，同时运行。</p></li><li><p>但在微观上：由于只有一个CPU，一次只能处理程序要求的一部分，如何处理公平，一种方法就是引入时间片，<strong>每个程序轮流执行</strong>。</p></li></ol><img src="https://npm.elemecdn.com/youthlql@1.0.8/JVM/chapter_003/0011.png"><h1 id="本地方法接口" tabindex="-1"><a class="header-anchor" href="#本地方法接口" aria-hidden="true">#</a> 本地方法接口</h1><h2 id="本地方法" tabindex="-1"><a class="header-anchor" href="#本地方法" aria-hidden="true">#</a> 本地方法</h2><img src="https://npm.elemecdn.com/youthlql@1.0.8/JVM/chapter_003/0012.png"><ol><li>简单地讲，<strong>一个Native Method是一个Java调用非Java代码的接囗</strong>一个Native Method是这样一个Java方法：该方法的实现由非Java语言实现，比如C。这个特征并非Java所特有，很多其它的编程语言都有这一机制，比如在C++中，你可以用extern 告知C++编译器去调用一个C的函数。</li><li>“A native method is a Java method whose implementation is provided by non-java code.”（本地方法是一个非Java的方法，它的具体实现是非Java代码的实现）</li><li>在定义一个native method时，并不提供实现体（有些像定义一个Java interface），因为其实现体是由非java语言在外面实现的。</li><li>本地接口的作用是融合不同的编程语言为Java所用，它的初衷是融合C/C++程序。</li></ol><h2 id="举例-1" tabindex="-1"><a class="header-anchor" href="#举例-1" aria-hidden="true">#</a> 举例</h2><p>需要注意的是：标识符native可以与其它java标识符连用，但是abstract除外</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">IHaveNatives</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">native</span> <span class="token keyword">void</span> <span class="token class-name">Native1</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token keyword">native</span> <span class="token keyword">static</span> <span class="token keyword">long</span> <span class="token class-name">Native2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">native</span> <span class="token keyword">synchronized</span> <span class="token keyword">float</span> <span class="token class-name">Native3</span><span class="token punctuation">(</span><span class="token class-name">Object</span> o<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">native</span> <span class="token keyword">void</span> <span class="token class-name">Native4</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">[</span><span class="token punctuation">]</span> ary<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span><span class="token punctuation">;</span>
    
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="为什么要使用-native-method" tabindex="-1"><a class="header-anchor" href="#为什么要使用-native-method" aria-hidden="true">#</a> 为什么要使用 Native Method？</h2><p>Java使用起来非常方便，然而有些层次的任务用Java实现起来不容易，或者我们对程序的效率很在意时，问题就来了。</p><h3 id="与java环境外交互" tabindex="-1"><a class="header-anchor" href="#与java环境外交互" aria-hidden="true">#</a> 与Java环境外交互</h3><p><strong>有时Java应用需要与Java外面的硬件环境交互，这是本地方法存在的主要原因</strong>。你可以想想Java需要与一些<strong>底层系统</strong>，如操作系统或某些硬件交换信息时的情况。本地方法正是这样一种交流机制：它为我们提供了一个非常简洁的接口，而且我们无需去了解Java应用之外的繁琐的细节。</p><h3 id="与操作系统的交互" tabindex="-1"><a class="header-anchor" href="#与操作系统的交互" aria-hidden="true">#</a> 与操作系统的交互</h3><ol><li>JVM支持着Java语言本身和运行时库，它是Java程序赖以生存的平台，它由一个解释器（解释字节码）和一些连接到本地代码的库组成。</li><li>然而不管怎样，它毕竟不是一个完整的系统，它经常依赖于一底层系统的支持。这些底层系统常常是强大的操作系统。</li><li><strong>通过使用本地方法，我们得以用Java实现了jre的与底层系统的交互，甚至JVM的一些部分就是用C写的</strong>。</li><li>还有，如果我们要使用一些Java语言本身没有提供封装的操作系统的特性时，我们也需要使用本地方法。</li></ol><h3 id="sun-s-java" tabindex="-1"><a class="header-anchor" href="#sun-s-java" aria-hidden="true">#</a> Sun’s Java</h3><ol><li>Sun的解释器是用C实现的，这使得它能像一些普通的C一样与外部交互。jre大部分是用Java实现的，它也通过一些本地方法与外界交互。</li><li>例如：类java.lang.Thread的setPriority()方法是用Java实现的，但是它实现调用的是该类里的本地方法setPriority0()。这个本地方法是用C实现的，并被植入JVM内部在Windows 95的平台上，这个本地方法最终将调用Win32 setpriority() API。这是一个本地方法的具体实现由JVM直接提供，更多的情况是本地方法由外部的动态链接库（external dynamic link library）提供，然后被JVM调用。</li></ol><h3 id="本地方法的现状" tabindex="-1"><a class="header-anchor" href="#本地方法的现状" aria-hidden="true">#</a> 本地方法的现状</h3><p>目前该方法使用的越来越少了，除非是与硬件有关的应用，比如通过Java程序驱动打印机或者Java系统管理生产设备，在企业级应用中已经比较少见。因为现在的异构领域间的通信很发达，比如可以使用Socket通信，也可以使用Web Service等等，不多做介绍。</p><h1 id="本地方法栈" tabindex="-1"><a class="header-anchor" href="#本地方法栈" aria-hidden="true">#</a> 本地方法栈</h1><ol><li><strong>Java虚拟机栈于管理Java方法的调用，而本地方法栈用于管理本地方法的调用</strong>。</li><li>本地方法栈，也是线程私有的。</li><li>允许被实现成固定或者是可动态扩展的内存大小（在内存溢出方面和虚拟机栈相同） <ul><li>如果线程请求分配的栈容量超过本地方法栈允许的最大容量，Java虚拟机将会抛出一个stackoverflowError 异常。</li><li>如果本地方法栈可以动态扩展，并且在尝试扩展的时候无法申请到足够的内存，或者在创建新的线程时没有足够的内存去创建对应的本地方法栈，那么Java虚拟机将会抛出一个outofMemoryError异常。</li></ul></li><li>本地方法一般是使用C语言或C++语言实现的。</li><li>它的具体做法是Native Method Stack中登记native方法，在Execution Engine 执行时加载本地方法库。</li></ol><img src="https://npm.elemecdn.com/youthlql@1.0.8/JVM/chapter_003/0013.png"><p><strong>注意事项</strong></p><ol><li>当某个线程调用一个本地方法时，它就进入了一个全新的并且不再受虚拟机限制的世界。它和虚拟机拥有同样的权限。 <ul><li>本地方法可以通过本地方法接口来访问虚拟机内部的运行时数据区</li><li>它甚至可以直接使用本地处理器中的寄存器</li><li>直接从本地内存的堆中分配任意数量的内存</li></ul></li><li>并不是所有的JVM都支持本地方法。因为Java虚拟机规范并没有明确要求本地方法栈的使用语言、具体实现方式、数据结构等。如果JVM产品不打算支持native方法，也可以无需实现本地方法栈。</li><li>在Hotspot JVM中，直接将本地方法栈和虚拟机栈合二为一。</li></ol>`,35);function v(b,h){const e=c("ExternalLinkIcon");return o(),l("div",null,[i,s("blockquote",null,[s("p",null,[n("官方文档网址："),s("a",k,[n("https://docs.oracle.com/javase/specs/jvms/se8/html/index.html"),p(e)])])]),u,s("blockquote",null,[s("p",null,[n("看字节码的方法："),s("a",m,[n("https://blog.csdn.net/21aspnet/article/details/88351875"),p(e)])])]),d])}const J=t(r,[["render",v],["__file","3.html.vue"]]);export{J as default};
