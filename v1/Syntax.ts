import { Lexer } from "./Lexer";
import { TokenReader, Token, TokenType } from "./Token";
import { ASTNodeType, ASTNode } from "./ASTNode";
class Syntax {
  /**
   * 解析脚本
   */
  public parse(script: string, verbose: boolean): ASTNode {
    const lexer: Lexer = new Lexer();
    const tokens: TokenReader = lexer.tokenize(script);
    if (verbose) {
      tokens.dumpTokens();
    }
    const rootNode: ASTNode = this.prog(tokens);
    return rootNode;
  }
  /**
   * 打印输出AST的树状结构
   */
  public dumpAST(node: ASTNode, indent: string) {
    console.log(indent + node.getType() + " " + node.getText());
    node.getChildren().forEach((child) => {
      this.dumpAST(child, indent + "\t");
    });
  }
  /**
   * AST的根节点，解析的入口。
   */
  private prog(tokens: TokenReader): ASTNode {
    const node: ASTNode = new ASTNode(ASTNodeType.Programm, "Program");
    while ( tokens.peek() !== null ) {
      let child: ASTNode|null = this.intDeclare(tokens);
      if (child === null) {
        child = this.expressionStatement(tokens);
      }
      if (child === null) {
        child = this.assignmentStatement(tokens);
      }

      if (child != null) {
          node.addChild(child);
      } else {
          throw new Error("unknown statement");
      }
    }
    return node;
  }
  /**
   * 表达式语句，即表达式后面跟个分号。
   */
  private expressionStatement(tokens: TokenReader): ASTNode|null {
    const pos: number = tokens.getPosition();
    let node: ASTNode|null = this.additive(tokens);
    if (node !== null) {
      const token: Token|null = tokens.peek();
      if (token !== null && token.getType() === TokenType.SemiColon) {
        tokens.read();
      } else {
        node = null;
        tokens.setPostion(pos);
      }
    }
    return node;
  }
  /**
   * 赋值语句
   */
  private assignmentStatement(tokens: TokenReader): ASTNode|null {
    let node: ASTNode|null = null;
    let token: Token|null = tokens.peek();
    if (token !== null && token.getType() === TokenType.Identifier) {
      tokens.read();
      node = new ASTNode(ASTNodeType.AssignmentStmt, token.getText());
      token = tokens.peek();
      if (token !== null && token.getType() === TokenType.Assignment) {
        tokens.read();
        const child: ASTNode|null = this.additive(tokens);
        if (child === null) {
          throw new Error("invalide assignment statement, expecting an expression");
        } else {
          node.addChild(child);
          token = tokens.peek();
          if (token !== null && token.getType() === TokenType.SemiColon) {
            tokens.read();
          } else {
            throw new Error("invalid statement, expecting semicolon");
          }
        }
      } else {
        tokens.unread();
        node = null;
      }
    }
    return node;
  }
  /**
   * 整型变量声明
   */
  private intDeclare(tokens: TokenReader): ASTNode|null {
    let node: ASTNode|null = null;
    let token: Token|null = tokens.peek();
    if (token != null && token.getType() === TokenType.Int) {
      tokens.read();
      token = tokens.peek();
      if (token !== null && token.getType() === TokenType.Identifier) {
        tokens.read();
        node = new ASTNode(ASTNodeType.IntDeclaration, token.getText());
        token = tokens.peek();
        if (token !== null && token.getType() === TokenType.Assignment) {
          tokens.read();
          const child: ASTNode|null = this.additive(tokens);
          if (child === null) {
            throw new Error("invalide variable initialization, expecting an expression");
          } else {
            node.addChild(child);
          }
        }
      } else {
        throw new Error("variable name expected");
      }
      if (node !== null) {
        token = tokens.peek();
        if (token !== null && token.getType() === TokenType.SemiColon) {
          tokens.read();
        } else {
          throw new Error("invalid statement, expecting semicolon");
        }
      }
    }
    return node;
  }
  private additive(tokens: TokenReader): ASTNode|null {
    let child1: ASTNode|null = this.multiplicative(tokens);
    let node: ASTNode|null = child1;
    if (child1 !== null) {
      while (true) {
        const token: Token|null = tokens.peek();
        if (token !== null && (token.getType() === TokenType.Plus || token.getType() === TokenType.Minus)) {
          tokens.read();
          const child2: ASTNode|null = this.multiplicative(tokens);
          if (child2 !== null) {
            node = new ASTNode(ASTNodeType.Additive, token.getText());
            node.addChild(child1);              // 新节点在顶层，保证正确的结合性
            node.addChild(child2);
            child1 = node;
          } else {
            throw new Error("invalid additive expression, expecting the right part.");
          }
        } else {
          break;
        }
      }
    }
    return node;
  }
  /**
   * 乘法表达式
   */
  private multiplicative(tokens: TokenReader): ASTNode|null {
    let child1: ASTNode|null = this.primary(tokens);
    let node: ASTNode|null  = child1;
    if (child1 !== null) {
      while (true) {
        const token: Token|null = tokens.peek();
        if (token !== null && (token.getType() === TokenType.Star || token.getType() === TokenType.Slash)) {
          tokens.read();
          const child2: ASTNode|null = this.primary(tokens);
          if (child2 !== null) {
            node = new ASTNode(ASTNodeType.Multiplicative, token.getText());
            node.addChild(child1);
            node.addChild(child2);
            child1 = node;
          } else {
            throw new Error("invalid multiplicative expression, expecting the right part.");
          }
        } else {
          break;
        }
      }
    }
    return node;
  }
  /**
   * 基础表达式
   */
  private primary(tokens: TokenReader): ASTNode|null {
    let node: ASTNode|null = null;
    let token: Token|null = tokens.peek();
    if (token !== null) {
      if (token.getType() === TokenType.IntLiteral) {
        tokens.read();
        node = new ASTNode(ASTNodeType.IntLiteral, token.getText());
      } else if (token.getType() === TokenType.Identifier) {
        tokens.read();
        node = new ASTNode(ASTNodeType.Identifier, token.getText());
      } else if (token.getType() === TokenType.LeftParen) {
        tokens.read();
        node = this.additive(tokens);
        if (node !== null) {
          token = tokens.peek();
          if (token !== null && token.getType() === TokenType.RightParen) {
            tokens.read();
          } else {
            throw new Error("expecting right parenthesis");
          }
        } else {
          throw new Error("expecting an additive expression inside parenthesis");
        }
      }
    }
    return node;
  }
}

export {
  Syntax,
};
