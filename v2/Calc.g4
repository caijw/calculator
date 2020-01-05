grammar Calc;
prog:   stat+ ;
stat:   expr SEMI                # printExpr
    |   'int' ID '=' expr SEMI         # assign
    |   SEMI                     # blank
    ;
expr:   expr op=('*'|'/') expr      # MulDiv
    |   expr op=('+'|'-') expr      # AddSub
    |   INT                         # int
    |   ID                          # id
    |   '(' expr ')'                # parens
    ;
MUL :   '*' ;
DIV :   '/' ;
ADD :   '+' ;
SUB :   '-' ;
SEMI : ';';
ID  :   [a-zA-Z]+ ; 
INT :   [0-9]+ ;
NEWLINE:'\r'? '\n' ;
WS  :   [ \t]+ -> skip ;
