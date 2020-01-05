// Generated from Calc.g4 by ANTLR 4.7.2
// jshint ignore: start
var antlr4 = require('antlr4/index');



var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0002\u000fG\b\u0001\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004",
    "\u0004\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t",
    "\u0007\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004",
    "\f\t\f\u0004\r\t\r\u0004\u000e\t\u000e\u0003\u0002\u0003\u0002\u0003",
    "\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0004\u0003\u0004\u0003",
    "\u0005\u0003\u0005\u0003\u0006\u0003\u0006\u0003\u0007\u0003\u0007\u0003",
    "\b\u0003\b\u0003\t\u0003\t\u0003\n\u0003\n\u0003\u000b\u0006\u000b3",
    "\n\u000b\r\u000b\u000e\u000b4\u0003\f\u0006\f8\n\f\r\f\u000e\f9\u0003",
    "\r\u0005\r=\n\r\u0003\r\u0003\r\u0003\u000e\u0006\u000eB\n\u000e\r\u000e",
    "\u000e\u000eC\u0003\u000e\u0003\u000e\u0002\u0002\u000f\u0003\u0003",
    "\u0005\u0004\u0007\u0005\t\u0006\u000b\u0007\r\b\u000f\t\u0011\n\u0013",
    "\u000b\u0015\f\u0017\r\u0019\u000e\u001b\u000f\u0003\u0002\u0005\u0004",
    "\u0002C\\c|\u0003\u00022;\u0004\u0002\u000b\u000b\"\"\u0002J\u0002\u0003",
    "\u0003\u0002\u0002\u0002\u0002\u0005\u0003\u0002\u0002\u0002\u0002\u0007",
    "\u0003\u0002\u0002\u0002\u0002\t\u0003\u0002\u0002\u0002\u0002\u000b",
    "\u0003\u0002\u0002\u0002\u0002\r\u0003\u0002\u0002\u0002\u0002\u000f",
    "\u0003\u0002\u0002\u0002\u0002\u0011\u0003\u0002\u0002\u0002\u0002\u0013",
    "\u0003\u0002\u0002\u0002\u0002\u0015\u0003\u0002\u0002\u0002\u0002\u0017",
    "\u0003\u0002\u0002\u0002\u0002\u0019\u0003\u0002\u0002\u0002\u0002\u001b",
    "\u0003\u0002\u0002\u0002\u0003\u001d\u0003\u0002\u0002\u0002\u0005!",
    "\u0003\u0002\u0002\u0002\u0007#\u0003\u0002\u0002\u0002\t%\u0003\u0002",
    "\u0002\u0002\u000b\'\u0003\u0002\u0002\u0002\r)\u0003\u0002\u0002\u0002",
    "\u000f+\u0003\u0002\u0002\u0002\u0011-\u0003\u0002\u0002\u0002\u0013",
    "/\u0003\u0002\u0002\u0002\u00152\u0003\u0002\u0002\u0002\u00177\u0003",
    "\u0002\u0002\u0002\u0019<\u0003\u0002\u0002\u0002\u001bA\u0003\u0002",
    "\u0002\u0002\u001d\u001e\u0007k\u0002\u0002\u001e\u001f\u0007p\u0002",
    "\u0002\u001f \u0007v\u0002\u0002 \u0004\u0003\u0002\u0002\u0002!\"\u0007",
    "?\u0002\u0002\"\u0006\u0003\u0002\u0002\u0002#$\u0007*\u0002\u0002$",
    "\b\u0003\u0002\u0002\u0002%&\u0007+\u0002\u0002&\n\u0003\u0002\u0002",
    "\u0002\'(\u0007,\u0002\u0002(\f\u0003\u0002\u0002\u0002)*\u00071\u0002",
    "\u0002*\u000e\u0003\u0002\u0002\u0002+,\u0007-\u0002\u0002,\u0010\u0003",
    "\u0002\u0002\u0002-.\u0007/\u0002\u0002.\u0012\u0003\u0002\u0002\u0002",
    "/0\u0007=\u0002\u00020\u0014\u0003\u0002\u0002\u000213\t\u0002\u0002",
    "\u000221\u0003\u0002\u0002\u000234\u0003\u0002\u0002\u000242\u0003\u0002",
    "\u0002\u000245\u0003\u0002\u0002\u00025\u0016\u0003\u0002\u0002\u0002",
    "68\t\u0003\u0002\u000276\u0003\u0002\u0002\u000289\u0003\u0002\u0002",
    "\u000297\u0003\u0002\u0002\u00029:\u0003\u0002\u0002\u0002:\u0018\u0003",
    "\u0002\u0002\u0002;=\u0007\u000f\u0002\u0002<;\u0003\u0002\u0002\u0002",
    "<=\u0003\u0002\u0002\u0002=>\u0003\u0002\u0002\u0002>?\u0007\f\u0002",
    "\u0002?\u001a\u0003\u0002\u0002\u0002@B\t\u0004\u0002\u0002A@\u0003",
    "\u0002\u0002\u0002BC\u0003\u0002\u0002\u0002CA\u0003\u0002\u0002\u0002",
    "CD\u0003\u0002\u0002\u0002DE\u0003\u0002\u0002\u0002EF\b\u000e\u0002",
    "\u0002F\u001c\u0003\u0002\u0002\u0002\u0007\u000249<C\u0003\b\u0002",
    "\u0002"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

function CalcLexer(input) {
	antlr4.Lexer.call(this, input);
    this._interp = new antlr4.atn.LexerATNSimulator(this, atn, decisionsToDFA, new antlr4.PredictionContextCache());
    return this;
}

CalcLexer.prototype = Object.create(antlr4.Lexer.prototype);
CalcLexer.prototype.constructor = CalcLexer;

Object.defineProperty(CalcLexer.prototype, "atn", {
        get : function() {
                return atn;
        }
});

CalcLexer.EOF = antlr4.Token.EOF;
CalcLexer.T__0 = 1;
CalcLexer.T__1 = 2;
CalcLexer.T__2 = 3;
CalcLexer.T__3 = 4;
CalcLexer.MUL = 5;
CalcLexer.DIV = 6;
CalcLexer.ADD = 7;
CalcLexer.SUB = 8;
CalcLexer.SEMI = 9;
CalcLexer.ID = 10;
CalcLexer.INT = 11;
CalcLexer.NEWLINE = 12;
CalcLexer.WS = 13;

CalcLexer.prototype.channelNames = [ "DEFAULT_TOKEN_CHANNEL", "HIDDEN" ];

CalcLexer.prototype.modeNames = [ "DEFAULT_MODE" ];

CalcLexer.prototype.literalNames = [ null, "'int'", "'='", "'('", "')'", 
                                     "'*'", "'/'", "'+'", "'-'", "';'" ];

CalcLexer.prototype.symbolicNames = [ null, null, null, null, null, "MUL", 
                                      "DIV", "ADD", "SUB", "SEMI", "ID", 
                                      "INT", "NEWLINE", "WS" ];

CalcLexer.prototype.ruleNames = [ "T__0", "T__1", "T__2", "T__3", "MUL", 
                                  "DIV", "ADD", "SUB", "SEMI", "ID", "INT", 
                                  "NEWLINE", "WS" ];

CalcLexer.prototype.grammarFileName = "Calc.g4";



exports.CalcLexer = CalcLexer;

