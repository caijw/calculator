/**
 * 一个简单的脚本解释器。
 * 所支持的语法，请参见SimpleParser.java
 *
 * 运行脚本：
 * > 2+3;
 * > int age = 10;
 * > int b;
 * > b = 10*2;
 * > age = age + b;
 *
 * 你还可以使用一个参数 -v，让每次执行脚本的时候，都输出AST和整个计算过程。
 *
 */

import { ASTNodeType, ASTNode } from "./ASTNode";

class Script {
  private variables: {
    [propName: string]: number;
  };
  private verbose: boolean;
  constructor(verbose: boolean) {
    this.variables = {};
    this.verbose = verbose;
  }
  public evaluateASTNode(node: ASTNode, indent: string): number {
    let result: number = 0;
    const self = this;
    let child1: ASTNode;
    let value1: number;
    let child2: ASTNode;
    let value2: number;
    if (this.verbose) {
      console.log(indent + "Calculating: " + node.getType());
    }
    switch (node.getType()) {
      case ASTNodeType.Programm:
        node.getChildren().forEach((child) => {
          result = self.evaluateASTNode(child, indent + "\t");
        });
        break;
      case ASTNodeType.Additive:
        child1 = node.getChildren()[0];
        value1 = self.evaluateASTNode(child1, indent + "\t");
        child2 = node.getChildren()[1];
        value2 = self.evaluateASTNode(child2, indent + "\t");
        if (node.getText() === "+") {
          result = value1 + value2;
        } else {
          result = value1 - value2;
        }
        break;
      case ASTNodeType.Multiplicative:
        child1 = node.getChildren()[0];
        value1 = self.evaluateASTNode(child1, indent + "\t");
        child2 = node.getChildren()[1];
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
      case ASTNodeType.Identifier:
        let varName: string = node.getText();
        if (this.variables.hasOwnProperty(varName)) {
          if (typeof this.variables[varName] === "number") {
            result = this.variables[varName];
          } else {
            throw new Error("variable " + varName + " has not been set any value");
          }
        } else {
          throw new Error("unknown variable: " + varName);
        }
        break;
      case ASTNodeType.AssignmentStmt:
        varName = node.getText();
        if (!this.variables.hasOwnProperty(varName)) {
          throw new Error("unknown variable: " + varName);
        }
      case ASTNodeType.IntDeclaration:
        varName = node.getText();
        let varValue = 0;
        if (node.getChildren().length > 0) {
          const child: ASTNode = node.getChildren()[0];
          result = this.evaluateASTNode(child, indent + "\t");
          varValue = result;
          this.variables[varName] = varValue;
        }
        break;
      default:
        break;
    }
    if (this.verbose) {
      console.log(indent + "Result: " + result);
    } else if (indent === "") {
      if (node.getType() === ASTNodeType.IntDeclaration || node.getType() === ASTNodeType.AssignmentStmt) {
        console.log(node.getText() + ": " + result);
      } else if (node.getType() !== ASTNodeType.Programm) {
        console.log(result);
      }
    }
    return result;
  }
}

export {
  Script,
};
