import { Lexer } from "./Lexer";
import { TokenReader } from "./Token";
import { Calculator } from "./Calculator";

let script: string;
let tokenReader: TokenReader;
const lexer = new Lexer();
const calculator: Calculator = new Calculator();

script = "int age = 45; i";
console.log(`parse: "${script}"`);
tokenReader = lexer.tokenize(script);
console.log("dump token:");
lexer.dump(tokenReader);

script = "inta age = 45;";
console.log(`parse: "${script}"`);
tokenReader = lexer.tokenize(script);
console.log("dump token:");
lexer.dump(tokenReader);

script = "in age = 45;";
console.log(`parse: "${script}"`);
tokenReader = lexer.tokenize(script);
console.log("dump token:");
lexer.dump(tokenReader);

script = "age >= 45;";
console.log(`parse: "${script}"`);
tokenReader = lexer.tokenize(script);
console.log("dump token:");
lexer.dump(tokenReader);

script = "age > 45;";
console.log(`parse: "${script}"`);
tokenReader = lexer.tokenize(script);
console.log("dump token:");
lexer.dump(tokenReader);

script = "2+3*5";
console.log(`计算: "${script}"，看上去一切正常。`);
calculator.evaluateScript(script);

script = "2+";
console.log(`计算: "${script}"，应该有语法错误。`);
calculator.evaluateScript(script);

script = "2+3+4";
console.log(`计算: "${script}"，结合性出现错误。`);
calculator.evaluateScript(script);

script = "2+3+4*6+10";
console.log(`计算: "${script}"`);
calculator.evaluateScript(script);
