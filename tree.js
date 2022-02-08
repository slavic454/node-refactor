const assert = require('assert')

const Node = (operator, value, left, right) => {
  const isSupportedOperator = (operator) =>
    ['+', '-', 'x', '÷'].includes(operator)

  const validateInput = ({ operator, value, left, right }) => {
    if (operator) {
      if (!isSupportedOperator(operator)) {
        throw Error('Provided operator not supported.')
      }
      if (!right || !left) {
        throw Error('No enough arguments for the provided operator.')
      }
    } else {
      if (typeof value !== 'number') {
        throw Error('Value must be a number.')
      }
    }
  }

  validateInput({ operator, value, left, right })

  const result = function () {
    switch (this.operator) {
      case '+':
        return left.result() + right.result()
      case '-':
        return left.result() - right.result()
      case 'x':
        return left.result() * right.result()
      case '÷':
        return left.result() / right.result()
      default:
        return value
    }
  }

  const toString = function () {
    const stringValue = this.operator
      ? `(${left.toString()} ${this.operator} ${right.toString()})`
      : value.toString()

    return stringValue
  }

  return {
    operator,
    value,
    left,
    right,
    result,
    toString,
  }
}

const tree = Node(
  '÷',
  null,
  Node(
    '+',
    null,
    Node('', 7, null, null),
    Node(
      'x',
      null,
      Node('-', null, Node('', 3, null, null), Node('', 2, null, null)),
      Node('', 5, null, null),
    ),
  ),
  Node('', 6, null, null),
)

assert.strictEqual('((7 + ((3 - 2) x 5)) ÷ 6)', tree.toString())
assert.strictEqual(2, tree.result())
