import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  // 代码笔记的侧边栏
  "/codenotes/": [
    //java
    {
      text: "Java",
      icon: "java",
      collapsible: true,
      prefix: "/codenotes/Java/",
      children: [
        {
          text: "JavaSE精修",
          collapsible: true,
          icon: "write",
          children: ["java基础.md", "java面向对象.md", "JDK新特性.md"]
        },
        {
          text: "重学Java(千锋教育2023)",
          collapsible: true,
          icon: "write",
          prefix: "qf/",
          children: ["1.md", "2.md", "3.md", "4.md"]
        },
        {
          text: "JVM(尚硅谷)",
          collapsible: true,
          icon: "write",
          prefix: "jvm/",
          children: ["1.md", "2.md", "3.md", "4.md", "5.md", "6.md", "7.md", "8.md", "9.md", "10.md", "11.md", "12.md"]
        },
        {
          text: "JVM(doocs)",
          collapsible: true,
          icon: "write",
          prefix: "jvm2/",
          children: ["1.md", "2.md", "3.md", "4.md", "5.md", "6.md", "7.md", "8.md", "9.md", "10.md"]
        },
        {
          text: "spring6",
          collapsible: true,
          icon: "write",
          link: "spring6.md",
        },
        {
          text: "coder1v5笔记",
          collapsible: true,
          icon: "write",
          prefix: "coder/",
          children: ["1.md", "2.md"]
        },
        {
          text: "设计模式(黑马)",
          collapsible: true,
          icon: "write",
          prefix: "hm/",
          children: ["1.md", "2.md", "3.md", "4.md", "5.md", "6.md"]
        },
      ]
    },
  ],

  // 浮生杂记的侧边栏
  "/floatinglife/": [
    {
      text: "小镇美食家",
      icon: "linter",
      collapsible: true,
      link: "/floatinglife/cooker/",
    },
    {
      text: "小镇技术宅",
      icon: "computer",
      collapsible: true,
      link: "/floatinglife/iter/",
    },
    {
      text: "小镇运动狂",
      icon: "strong",
      collapsible: true,
      link: "/floatinglife/sporter/",
    },
    {
      text: "小镇思考者",
      icon: "style",
      collapsible: true,
      link: "/floatinglife/thinker/",
    },
  ],

  // 开源项目的侧边栏
  "/projects/": [
    {
      text: "技术教程",
      icon: "guide",
      collapsible: true,
      link: "/projects/techguide/",
    },
    {
      text: "实战项目",
      icon: "workingDirectory",
      collapsible: true,
      link: "/projects/pracprojects/",
    },
    {
      text: "系统设计",
      icon: "shell",
      collapsible: true,
      link: "/projects/systemdesign/",
    },
    {
      text: "工具类库",
      icon: "module",
      collapsible: true,
      link: "/projects/toollibrary/",
    },
  ],
});
