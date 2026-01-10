/**
 * Python AST Parser
 * 
 * This module will parse Python source code into an AST representation.
 * Currently a stub - tests are written to fail until implementation is complete.
 */

export interface ASTNode {
  type: string
  [key: string]: unknown
}

export interface ImportNode extends ASTNode {
  type: 'Import'
  names: { name: string; asname?: string }[]
}

export interface ImportFromNode extends ASTNode {
  type: 'ImportFrom'
  module: string
  names: { name: string; asname?: string }[]
  level: number
}

export interface FunctionDefNode extends ASTNode {
  type: 'FunctionDef' | 'AsyncFunctionDef'
  name: string
  args: ArgumentsNode
  body: ASTNode[]
  decorator_list: ASTNode[]
  returns?: ASTNode
}

export interface ArgumentsNode extends ASTNode {
  type: 'arguments'
  args: ArgNode[]
  defaults: ASTNode[]
  kwonlyargs: ArgNode[]
  kw_defaults: (ASTNode | null)[]
  vararg?: ArgNode
  kwarg?: ArgNode
}

export interface ArgNode extends ASTNode {
  type: 'arg'
  arg: string
  annotation?: ASTNode
}

export interface ClassDefNode extends ASTNode {
  type: 'ClassDef'
  name: string
  bases: ASTNode[]
  keywords: ASTNode[]
  body: ASTNode[]
  decorator_list: ASTNode[]
}

export interface AssignNode extends ASTNode {
  type: 'Assign'
  targets: ASTNode[]
  value: ASTNode
}

export interface AugAssignNode extends ASTNode {
  type: 'AugAssign'
  target: ASTNode
  op: string
  value: ASTNode
}

export interface AnnAssignNode extends ASTNode {
  type: 'AnnAssign'
  target: ASTNode
  annotation: ASTNode
  value?: ASTNode
  simple: number
}

export interface IfNode extends ASTNode {
  type: 'If'
  test: ASTNode
  body: ASTNode[]
  orelse: ASTNode[]
}

export interface ForNode extends ASTNode {
  type: 'For' | 'AsyncFor'
  target: ASTNode
  iter: ASTNode
  body: ASTNode[]
  orelse: ASTNode[]
}

export interface WhileNode extends ASTNode {
  type: 'While'
  test: ASTNode
  body: ASTNode[]
  orelse: ASTNode[]
}

export interface WithNode extends ASTNode {
  type: 'With' | 'AsyncWith'
  items: WithItemNode[]
  body: ASTNode[]
}

export interface WithItemNode extends ASTNode {
  type: 'withitem'
  context_expr: ASTNode
  optional_vars?: ASTNode
}

export interface MatchNode extends ASTNode {
  type: 'Match'
  subject: ASTNode
  cases: MatchCaseNode[]
}

export interface MatchCaseNode extends ASTNode {
  type: 'match_case'
  pattern: ASTNode
  guard?: ASTNode
  body: ASTNode[]
}

export interface TryNode extends ASTNode {
  type: 'Try'
  body: ASTNode[]
  handlers: ExceptHandlerNode[]
  orelse: ASTNode[]
  finalbody: ASTNode[]
}

export interface ExceptHandlerNode extends ASTNode {
  type: 'ExceptHandler'
  type_?: ASTNode
  name?: string
  body: ASTNode[]
}

export interface RaiseNode extends ASTNode {
  type: 'Raise'
  exc?: ASTNode
  cause?: ASTNode
}

export interface ListCompNode extends ASTNode {
  type: 'ListComp'
  elt: ASTNode
  generators: ComprehensionNode[]
}

export interface DictCompNode extends ASTNode {
  type: 'DictComp'
  key: ASTNode
  value: ASTNode
  generators: ComprehensionNode[]
}

export interface SetCompNode extends ASTNode {
  type: 'SetComp'
  elt: ASTNode
  generators: ComprehensionNode[]
}

export interface GeneratorExpNode extends ASTNode {
  type: 'GeneratorExp'
  elt: ASTNode
  generators: ComprehensionNode[]
}

export interface ComprehensionNode extends ASTNode {
  type: 'comprehension'
  target: ASTNode
  iter: ASTNode
  ifs: ASTNode[]
  is_async: number
}

export interface LambdaNode extends ASTNode {
  type: 'Lambda'
  args: ArgumentsNode
  body: ASTNode
}

export interface JoinedStrNode extends ASTNode {
  type: 'JoinedStr'
  values: ASTNode[]
}

export interface FormattedValueNode extends ASTNode {
  type: 'FormattedValue'
  value: ASTNode
  conversion: number
  format_spec?: ASTNode
}

export interface NameNode extends ASTNode {
  type: 'Name'
  id: string
}

export interface ConstantNode extends ASTNode {
  type: 'Constant'
  value: unknown
}

export interface ModuleNode extends ASTNode {
  type: 'Module'
  body: ASTNode[]
}

/**
 * Parse Python source code into an AST
 * @throws Error - Not yet implemented
 */
export function parse(source: string): ModuleNode {
  throw new Error('parse() not implemented')
}

/**
 * Parse a single Python expression
 * @throws Error - Not yet implemented
 */
export function parseExpression(source: string): ASTNode {
  throw new Error('parseExpression() not implemented')
}
