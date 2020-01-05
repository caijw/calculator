# readme

`calculator`实现

手写的词法分析器和语法分析器

- 支持整型计算
- 支持加减乘除运算，运算优先级 乘除 > 加减，运算符都是左结合的
- 支持括号，括号改变运算优先级
- 支持变量声明和赋值 (int a = 10 + 1;)
  
## 运行

```sh
npm install
npm run compile
node ./dist/cli.js -v
```
