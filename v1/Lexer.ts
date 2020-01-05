/**
 * 词法分析器
 */
import { Token, TokenType, TokenReader } from "./Token";
import * as util from "./util";

enum DfaState {
  Initial,

  Int, Id_int1, Id_int2, Id_int3, Id, GE,

  Assignment,

  Plus, Minus, Star, Slash,

  SemiColon,
  LeftParen,
  RightParen,

  IntLiteral,
}

class Lexer {
  private tokenText: string;
  private tokens: Token[];
  private token: Token;
  constructor() {
    this.tokenText = ``;
    this.tokens = [];
    this.token = new Token();
  }
  public tokenize(code: string) {
    this.tokens = [];
    this.tokenText = ``;
    this.token = new Token();
    let ch: string = "";
    let index: number = 0;
    let state: DfaState = DfaState.Initial;
    while (index < code.length) {
      ch = code[index];
      switch (state) {
        case  DfaState.Initial:
          state = this.initToken(ch);
          break;
        case DfaState.Id:
          if (util.isAlpha(ch) || util.isDigit(ch)) {
              this.tokenText = `${this.tokenText}${ch}`;
          } else {
              state = this.initToken(ch);
          }
          break;
        case DfaState.GE:
        case DfaState.Assignment:
        case DfaState.Plus:
        case DfaState.Minus:
        case DfaState.Star:
        case DfaState.Slash:
        case DfaState.SemiColon:
        case DfaState.LeftParen:
        case DfaState.RightParen:
          state = this.initToken(ch);
          break;
        case DfaState.IntLiteral:
          if (util.isDigit(ch)) {
            this.tokenText = `${this.tokenText}${ch}`;
          } else {
            state = this.initToken(ch);
          }
          break;
        case DfaState.Id_int1:
          if (ch === `n`) {
            state = DfaState.Id_int2;
            this.tokenText = `${this.tokenText}${ch}`;
          } else if (util.isDigit(ch) || util.isAlpha(ch)) {
            state = DfaState.Id;
            this.tokenText = `${this.tokenText}${ch}`;
          } else {
            state = this.initToken(ch);
          }
          break;
        case DfaState.Id_int2:
          if (ch === `t`) {
            state = DfaState.Id_int3;
            this.tokenText = `${this.tokenText}${ch}`;
          } else if (util.isDigit(ch) || util.isAlpha(ch)) {
            state = DfaState.Id;
            this.tokenText = `${this.tokenText}${ch}`;
          } else {
            state = this.initToken(ch);
          }
          break;
        case DfaState.Id_int3:
          if (util.isBlank(ch)) {
            this.token.type = TokenType.Int;
            state = this.initToken(ch);
          } else {
            state = DfaState.Id;
            this.tokenText = `${this.tokenText}${ch}`;
          }
          break;
        default:
          break;
      }
      index++;

    }
    if (this.tokenText.length) {
      this.initToken(ch);
    }
    return new TokenReader(this.tokens);
  }
  public dump(tokenReader: TokenReader) {
    console.log((`text\t\ttype`));
    let token: Token|null = tokenReader.read();
    while (token !== null) {
      console.log(`${token.getText()}\t\t${token.getType()}`);
      token = tokenReader.read();
    }
  }
  // 初始化token
  private initToken(ch: string): DfaState {
    if (this.tokenText.length) {
      this.token.text = this.tokenText;
      this.tokens.push(this.token);
      this.tokenText = ``;
      this.token = new Token();
    }
    let newState: DfaState = DfaState.Initial;
    if (util.isAlpha(ch)) {
      if (ch === `i`) {
        newState = DfaState.Id_int1;
      } else {
        newState = DfaState.Id;
      }
      this.token.type = TokenType.Identifier;
      this.tokenText = `${this.tokenText}${ch}`;
    } else if (util.isDigit(ch)) {
      newState = DfaState.IntLiteral;
      this.token.type = TokenType.IntLiteral;
      this.tokenText = `${this.tokenText}${ch}`;
    } else if (ch === `+`) {
      newState = DfaState.Plus;
      this.token.type = TokenType.Plus;
      this.tokenText = `${this.tokenText}${ch}`;
    } else if (ch === `-`) {
      newState = DfaState.Minus;
      this.token.type = TokenType.Minus;
      this.tokenText = `${this.tokenText}${ch}`;
    } else if (ch === `*`) {
      newState = DfaState.Star;
      this.token.type = TokenType.Star;
      this.tokenText = `${this.tokenText}${ch}`;
    } else if (ch === `/`) {
      newState = DfaState.Slash;
      this.token.type = TokenType.Slash;
    } else if (ch === `;`) {
      newState = DfaState.SemiColon;
      this.token.type = TokenType.SemiColon;
      this.tokenText = `${this.tokenText}${ch}`;
    } else if (ch === `(`) {
      newState = DfaState.LeftParen;
      this.token.type = TokenType.LeftParen;
      this.tokenText = `${this.tokenText}${ch}`;
    } else if (ch === `)`) {
      newState = DfaState.RightParen;
      this.token.type = TokenType.RightParen;
      this.tokenText = `${this.tokenText}${ch}`;
    } else if (ch === `=`) {
      newState = DfaState.Assignment;
      this.token.type = TokenType.Assignment;
      this.tokenText = `${this.tokenText}${ch}`;
    } else {
      newState = DfaState.Initial;
    }
    return newState;
  }
}

export {
  Lexer,
};
