title: "使用mysql筛选出某字段中文的记录"
id: 641
date: 2010-12-02 17:08:54
tags:
- 网络技术
categories:
- 乱七八糟
---
项目中遇到了一个数据处理的问题，简单的描述一下：字段name中有英文的也有中文的，数据比较庞大，如果使用php处理整个表都要捣鼓一遍，不是很“低碳”。

后来想到了使用mysql的正则，于是上网查了一下，找到了以下的方法：

```mysql

select * from table where not name regexp '^[1-9A-Za-z]';
```

这样就可以筛选出来name字段中全部为中文的记录了。
记录一下