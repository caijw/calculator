
enum TokenType {
  Init, // init 0
  Plus,   // + 1
  Minus,  // - 2
  Star,   // * 3
  Slash,  // / 4
  SemiColon, // ; 5
  LeftParen, // ( 6
  RightParen, // ) 7
  Assignment, // = 8
  Int, // int 9
  Identifier, // 标识符 10
  IntLiteral,  // 整型字面量 11
}

class Token {
  public type: TokenType;
  public text: string;
  constructor() {
    this.type = TokenType.Init;
    this.text = ``;
  }
  public getType(): TokenType {
    return this.type;
  }
  public getText(): string {
    return this.text;
  }
}

class TokenReader {
  private tokens: Token[];
  private pos: number;
  constructor(tokens: Token[]) {
    this.tokens = tokens;
    this.pos = 0;
  }
  public read(): Token|null {
    if (this.pos < this.tokens.length) {
      return this.tokens[this.pos++];
    } else {
      return null;
    }
  }
  public peek(): Token|null {
    if (this.pos < this.tokens.length) {
      return this.tokens[this.pos];
    } else {
      return null;
    }
  }
  public unread() {
    if (this.pos > 0) {
      this.pos--;
    }
  }
  public getPosition(): number {
    return this.pos;
  }
  public setPostion(postion: number) {
    if (postion >= 0 && postion <= this.tokens.length) {
      this.pos = postion;
    }
  }
  public dumpTokens() {
    console.log("tokens:");
    console.log(this.tokens);
  }

}

export { Token, TokenType, TokenReader };
