#!/usr/bin/env node
import * as readline from "readline";
import { Script } from "./Script";
import { ASTNodeType, ASTNode } from "./ASTNode";
import { Syntax } from "./Syntax";

let verbose: boolean = false;

if (process.argv[2] === "-v") {
  verbose = true;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "calculator> ",
});

rl.prompt();

const script = new Script(false);
const syntax = new Syntax();
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
    const tree: ASTNode = syntax.parse(scriptText, verbose);
    if (verbose) {
      console.log("ast:");
      syntax.dumpAST(tree, "");
    }
    const result: number = script.evaluateASTNode(tree, "");
    console.log("result:");
    console.log(result);
    scriptText = "";
  }
  rl.prompt();
}).on("close", () => {
  console.log("see you!");
  process.exit(0);
});
