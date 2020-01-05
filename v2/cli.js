const antlr4 = require("antlr4");
const Lexer = require("./CalcLexer").CalcLexer;
const Parser = require("./CalcParser").CalcParser;
const EvalVisitor = require("./EvalVisitor").CalcVisitor;
const readline = require("readline");

function parse(script) {
  const chars = new antlr4.InputStream(script);
  const lexer = new Lexer(chars);
  const tokens  = new antlr4.CommonTokenStream(lexer);
  var parser = new Parser(tokens);
  parser.buildParseTrees = true;
  const tree = parser.prog();
  console.log("The lisp style ast of : \n" + script);
  const stringTree = tree.toStringTree(parser.ruleNames);
  console.log(stringTree);
  const res = eval.visit(tree);
}

let verbose = false;

if (process.argv[2] === "-v") {
  verbose = true;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'script engine> '
});

rl.prompt();

const eval = new EvalVisitor(verbose);

let scriptText = "";

rl.on("line", (line) => {
  line = line.trim();
  if (line === "exit();") {
    console.log("good bye!");
    process.exit(0);
    return;
  }
  scriptText += line + "\n";
  if (/;$/.test(line)) {
    parse(scriptText);
    scriptText = "";
  }
  rl.prompt();
}).on("close", () => {
  console.log("Have a great day!");
  process.exit(0);
});
