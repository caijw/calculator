enum ASTNodeType {
  Programm,           // 程序入口，根节点 0

  IntDeclaration,     // 整型变量声明 1
  ExpressionStmt,     // 表达式语句，即表达式后面跟个分号
  AssignmentStmt,     // 赋值语句

  Primary,            // 基础表达式 4
  Multiplicative,     // 乘法表达式
  Additive,           // 加法表达式

  Identifier,         // 标识符 7
  IntLiteral,          // 整型字面量
}

class ASTNode {
  private parent: ASTNode|null = null;
  private children: ASTNode[] = [];
  private nodeType: ASTNodeType;
  private text: string;
  constructor(nodeType: ASTNodeType, text: string) {
    this.nodeType = nodeType;
    this.text = text;
  }
  public getParent(): ASTNode|null {
    return this.parent;
  }
  public getChildren(): ASTNode[] {
    return this.children;
  }
  public getType(): ASTNodeType {
    return this.nodeType;
  }
  public getText(): string {
    return this.text;
  }
  public addChild(child: ASTNode) {
    this.children.push(child);
  }
}

export {
  ASTNodeType,
  ASTNode,
};
