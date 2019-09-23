import * as ts from 'typescript';


/**
 * for
 */
export class ForStatement {
    node: ts.ForStatement
}
/**
 * for in
 */
export class ForInStatement {
    node: ts.ForInStatement
}
/**
 * for of
 */
export class ForOfStatement {
    node: ts.ForOfStatement
}
/**
 * if
 * if else 
 * if elseif else
 */
export class IfStatement {
    node: ts.IfStatement
}

/**
 * while
 */
export class WhileStatement {
    node: ts.WhileStatement
}

/**
 * do
 */
export class DoStatement {
    node: ts.DoStatement
}

/**
 * continue
 */
export class ContinueStatement {
    node: ts.ContinueStatement;
}


export class VariableStatement {
    node: ts.VariableStatement;
}