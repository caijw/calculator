import { Lexer } from "./Lexer";
import { TokenReader, Token, TokenType } from "./Token";
import { ASTNodeType, ASTNode } from "./ASTNode";

class Calculator {
  public evaluateScript(script: string) {
    try {
      const tree: ASTNode = this.parse(script);
      console.log("dumpAST:");
      this.dumpAST(tree, "");
      console.log("evaluateASTNode:");
      this.evaluateASTNode(tree, "");
    } catch (err) {
      console.error(err.message);
    }
  }
  public dumpAST(node: ASTNode, indent: string) {
    const self = this;
    console.log(indent + node.getType() + " " + node.getText());
    const children = node.getChildren();
    children.forEach((child) => {
      self.dumpAST(child, indent + "\t");
    });
  }
  /**
   * 语法分析
   */
  public parse(code: string): ASTNode {
    const lexer: Lexer = new Lexer();
    const tokens: TokenReader = lexer.tokenize(code);
    const rootNode: ASTNode = this.prog(tokens);
    return rootNode;
  }
  /**
   * 解释执行AST
   */
  public evaluateASTNode(node: ASTNode, indent: string): number {
    let result: number = 0;
    const self = this;
    const children = node.getChildren();
    let child1: ASTNode;
    let child2: ASTNode;
    let value1: number;
    let value2: number;
    console.log(indent + "Calculating: " + node.getType());
    switch (node.getType()) {
      case ASTNodeType.Programm:
        children.forEach((child) => {
          result = self.evaluateASTNode(child, indent + "\t");
        });
        break;
      case ASTNodeType.Additive:
        child1 = children[0];
        value1 = self.evaluateASTNode(child1, indent + "\t");
        child2 = children[1];
        value2 = self.evaluateASTNode(child2, indent + "\t");
        if (node.getText() === "+") {
          result = value1 + value2;
        } else {
          result = value1 - value2;
        }
        break;
      case ASTNodeType.Multiplicative:
        child1 = children[0];
        value1 = self.evaluateASTNode(child1, indent + "\t");
        child2 = children[1];
        value2 = self.evaluateASTNode(child2, indent + "\t");
        if (node.getText() === "*") {
          result = value1 * value2;
        } else {
          result = value1 / value2;
        }
        break;
      case ASTNodeType.IntLiteral:
        result = parseInt(node.getText(), 10);
        break;
      default:
        break;
    }
    console.log(indent + "Result: " + result);
    return result;
  }
  private prog(tokens: TokenReader): ASTNode {
    const node: ASTNode = new ASTNode(ASTNodeType.Programm, "Calculator");
    const child: ASTNode|null = this.additive(tokens);
    if (child !== null) {
      node.addChild(child);
    }
    return node;
  }
  private additive(tokens: TokenReader): ASTNode|null {
    const child1: ASTNode|null = this.multiplicative(tokens);
    let node: ASTNode|null = child1;
    let token: Token|null = tokens.peek();
    if (child1 !== null && token !== null) {
      if (token.getType() === TokenType.Plus || token.getType() === TokenType.Minus) {
        token = tokens.read();
        const child2: ASTNode|null = this.additive(tokens);
        if (child2 !== null && token !== null) {
          node = new ASTNode(ASTNodeType.Additive, token.getText());
          node.addChild(child1);
          node.addChild(child2);
        } else {
          throw new Error("invalid additive expression, expecting the right part.");
        }
      }

    }
    return node;
  }
  private multiplicative(tokens: TokenReader): ASTNode|null {
    const child1: ASTNode|null = this.primary(tokens);
    let node: ASTNode|null = child1;
    let token: Token|null = tokens.peek();
    if (child1 !== null && token !== null) {
      if (token.getType() === TokenType.Star || token.getType() === TokenType.Slash) {
        token = tokens.read();
        const child2: ASTNode|null = this.multiplicative(tokens);
        if (child2 !== null && token !== null) {
          node = new ASTNode(ASTNodeType.Multiplicative, token.getText());
          node.addChild(child1);
          node.addChild(child2);
        } else {
          throw new Error("invalid multiplicative expression, expecting the right part.");
        }
      }
    }
    return node;
  }
  private primary(tokens: TokenReader): ASTNode|null {
    let node: ASTNode|null = null;
    let token: Token|null = tokens.peek();
    if (token !== null) {
      if (token.getType() === TokenType.IntLiteral) {
        token = tokens.read();
        if (token !== null) {
          node = new ASTNode(ASTNodeType.IntLiteral, token.getText());
        }
      } else if (token.getType() === TokenType.Identifier) {
        token = tokens.read();
        if (token !== null) {
          node = new ASTNode(ASTNodeType.Identifier, token.getText());
        }
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
        }
      } else {
        throw new Error("expecting an additive expression inside parenthesis");
      }
    }
    return node;
  }
}

export {
  Calculator,
};
