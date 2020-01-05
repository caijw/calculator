var antlr4 = require('antlr4/index');
const Base = require("./CalcVisitor").CalcVisitor;
const CalcParser = require("./CalcParser").CalcParser;
function CalcVisitor(verbose) {
  Base.call(this);
  this.memory = {};
  this.verbose = verbose;
	return this;
}

CalcVisitor.prototype = Object.create(Base.prototype);
CalcVisitor.prototype.constructor = CalcVisitor;

CalcVisitor.prototype.visitAssign = function(ctx) {
  const id = ctx.ID().getText();
  const value = this.visit(ctx.expr());
  this.memory[id] = value;
  if (this.verbose) {
    console.log("result:", value);
  }
};


CalcVisitor.prototype.visitPrintExpr = function(ctx) {
  const value = this.visit(ctx.expr());
  if (this.verbose) {
    console.log("result:", value);
  }
  return 0;
};

CalcVisitor.prototype.visitInt = function(ctx) {
  return parseInt(ctx.INT().getText(), 10);
};

CalcVisitor.prototype.visitId = function(ctx) {
  const id = ctx.ID().getText();
  if (typeof this.memory[id] !== "undefined") {
    return this.memory[id];
  }
  return 0;
};

CalcVisitor.prototype.visitMulDiv = function(ctx) {
  const left = this.visit(ctx.expr(0));
  const right = this.visit(ctx.expr(1));
  if (ctx.op.type === CalcParser.MUL) {
    return left * right;
  } else {
    return left / right;
  }
};

CalcVisitor.prototype.visitAddSub = function(ctx) {
  const left = this.visit(ctx.expr(0));
  const right = this.visit(ctx.expr(1));
  if (ctx.op.type === CalcParser.ADD) {
    return left + right;
  } else {
    return left - right;
  }
};


CalcVisitor.prototype.visitParens = function(ctx) {
  return this.visit(ctx.expr());
};

CalcVisitor.prototype.visitClear = function(ctx) {
  this.map = {};
};

exports.CalcVisitor = CalcVisitor;
