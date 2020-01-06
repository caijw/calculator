# readme

包含词法分析，语法分析和ast解释执行的`calculator`的实现

[v1](https://github.com/caijw/calculator/tree/master/v1): 手写词法分析器和语法分析器
[v2](https://github.com/caijw/calculator/tree/master/v2): 基于`antlr4`自动生成词法分析器和语法分析器

`calculator`支持的功能

- 支持整型计算
- 支持加减乘除运算，运算优先级 乘除 > 加减，运算符都是左结合的
- 支持括号，括号改变运算优先级
- 支持变量声明和赋值 (int a = 10 + 1;)
