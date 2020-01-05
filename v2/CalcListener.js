// Generated from Calc.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by CalcParser.
function CalcListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

CalcListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
CalcListener.prototype.constructor = CalcListener;

// Enter a parse tree produced by CalcParser#prog.
CalcListener.prototype.enterProg = function(ctx) {
};

// Exit a parse tree produced by CalcParser#prog.
CalcListener.prototype.exitProg = function(ctx) {
};


// Enter a parse tree produced by CalcParser#printExpr.
CalcListener.prototype.enterPrintExpr = function(ctx) {
};

// Exit a parse tree produced by CalcParser#printExpr.
CalcListener.prototype.exitPrintExpr = function(ctx) {
};


// Enter a parse tree produced by CalcParser#assign.
CalcListener.prototype.enterAssign = function(ctx) {
};

// Exit a parse tree produced by CalcParser#assign.
CalcListener.prototype.exitAssign = function(ctx) {
};


// Enter a parse tree produced by CalcParser#blank.
CalcListener.prototype.enterBlank = function(ctx) {
};

// Exit a parse tree produced by CalcParser#blank.
CalcListener.prototype.exitBlank = function(ctx) {
};


// Enter a parse tree produced by CalcParser#parens.
CalcListener.prototype.enterParens = function(ctx) {
};

// Exit a parse tree produced by CalcParser#parens.
CalcListener.prototype.exitParens = function(ctx) {
};


// Enter a parse tree produced by CalcParser#MulDiv.
CalcListener.prototype.enterMulDiv = function(ctx) {
};

// Exit a parse tree produced by CalcParser#MulDiv.
CalcListener.prototype.exitMulDiv = function(ctx) {
};


// Enter a parse tree produced by CalcParser#AddSub.
CalcListener.prototype.enterAddSub = function(ctx) {
};

// Exit a parse tree produced by CalcParser#AddSub.
CalcListener.prototype.exitAddSub = function(ctx) {
};


// Enter a parse tree produced by CalcParser#id.
CalcListener.prototype.enterId = function(ctx) {
};

// Exit a parse tree produced by CalcParser#id.
CalcListener.prototype.exitId = function(ctx) {
};


// Enter a parse tree produced by CalcParser#int.
CalcListener.prototype.enterInt = function(ctx) {
};

// Exit a parse tree produced by CalcParser#int.
CalcListener.prototype.exitInt = function(ctx) {
};



exports.CalcListener = CalcListener;