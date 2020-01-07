module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/standard'
  ],
  rules: {
    // ESLint 规则
    // https://eslint.org/docs/rules/
    // https://cn.eslint.org/docs/rules/
    // ESLint Config for JavaScript Standard Style
    // https://github.com/standard/eslint-config-standard
    // JavaScript Standard Style
    // https://standardjs.com/
    // eslint-plugin-vue
    // https://eslint.vuejs.org/rules/

    // ***** Possible Errors 可能的错误或逻辑错误 *****
    // 禁止条件表达式中出现赋值操作符
    // https://eslint.org/docs/rules/no-cond-assign
    // 特殊处理：启用该规则的情况下，会对形如 for (let i = 0, item; item = list[i++];) {}
    // 这类的循环条件语句造成误判，因此关闭该规则
    'no-cond-assign': 'off',

    // 禁用 console
    // https://eslint.org/docs/rules/no-console
    'no-console': ['error', { allow: ['warn', 'error'] }],

    // 禁止在正则表达式中使用控制字符
    // https://eslint.org/docs/rules/no-control-regex
    // ESLint 官方建议启用此规则，但是业务需要使用控制字符进行模式匹配，故此关闭
    'no-control-regex': 'off',

    // 禁止不必要的括号
    // https://eslint.org/docs/rules/no-extra-parens
    'no-extra-parens': ['off', 'all', {
      conditionalAssign: true,
      nestedBinaryExpressions: false,
      returnAssign: false,
      ignoreJSX: 'all', // delegate to eslint-plugin-react
      enforceForArrowConditionals: false
    }],

    // 禁止在常规字符串中出现模板字面量占位符语法
    // https://eslint.org/docs/rules/no-template-curly-in-string
    'no-template-curly-in-string': 'error',

    // ***** Best Practices 最佳实践 *****
    // 强制所有控制语句使用一致的括号风格
    // https://eslint.org/docs/rules/curly
    curly: ['error', 'multi-line'],

    // 要求 switch 语句中有 default 分支
    // https://eslint.org/docs/rules/default-case
    'default-case': 'error',

    // 强制在点号之前或之后换行
    // https://eslint.org/docs/rules/dot-location
    'dot-location': ['error', 'property'],

    // 强制尽可能地使用点号
    // https://eslint.org/docs/rules/dot-notation
    'dot-notation': ['error', { allowKeywords: true }],

    // 要求使用 === 和 !==
    // https://eslint.org/docs/rules/eqeqeq
    eqeqeq: ['error', 'always', { null: 'ignore' }],

    // 禁用 alert、confirm 和 prompt
    // https://eslint.org/docs/rules/no-alert
    'no-alert': 'error',

    // 禁用 arguments.caller 或 arguments.callee
    // https://eslint.org/docs/rules/no-caller
    'no-caller': 'error',

    // 禁用 eval()
    // https://eslint.org/docs/rules/no-eval
    'no-eval': 'error',

    // 禁止扩展原生类型
    // https://eslint.org/docs/rules/no-extend-native
    'no-extend-native': 'error',

    // 禁止不必要的 .bind() 调用
    // https://eslint.org/docs/rules/no-extra-bind
    'no-extra-bind': 'error',

    // 禁止数字字面量中使用前导和末尾小数点
    // https://eslint.org/docs/rules/no-floating-decimal
    'no-floating-decimal': 'error',

    // 禁用隐式的eval()
    // https://eslint.org/docs/rules/no-implied-eval
    'no-implied-eval': 'error',

    // 禁用 __iterator__ 属性
    // https://eslint.org/docs/rules/no-iterator
    'no-iterator': 'error',

    // 禁用标签语句
    // https://eslint.org/docs/rules/no-labels
    'no-labels': ['error', { allowLoop: false, allowSwitch: false }],

    // 禁用不必要的嵌套块
    // https://eslint.org/docs/rules/no-lone-blocks
    'no-lone-blocks': 'error',

    // 禁止出现多个空格
    // https://eslint.org/docs/rules/no-multi-spaces
    'no-multi-spaces': 'error',

    // 禁止多行字符串
    // https://eslint.org/docs/rules/no-multi-str
    'no-multi-str': 'error',

    // 禁止使用 new 以避免产生副作用
    // https://eslint.org/docs/rules/no-new
    'no-new': 'error',

    // 禁用Function构造函数
    // https://eslint.org/docs/rules/no-new-func
    'no-new-func': 'error',

    // 禁止对 String，Number 和 Boolean 使用 new 操作符
    // https://eslint.org/docs/rules/no-new-wrappers
    'no-new-wrappers': 'error',

    // 禁止在字符串中使用八进制转义序列
    // https://eslint.org/docs/rules/no-octal-escape
    'no-octal-escape': 'error',

    // 禁用 __proto__ 属性
    // https://eslint.org/docs/rules/no-proto
    'no-proto': 'error',

    // 禁止多次声明同一变量
    // https://eslint.org/docs/rules/no-redeclare
    'no-redeclare': ['error', { builtinGlobals: false }],

    // 禁用不必要的 return await
    // https://eslint.org/docs/rules/no-return-await
    'no-return-await': 'error',

    // 禁止在 return 语句中使用赋值语句
    // https://eslint.org/docs/rules/no-return-assign
    'no-return-assign': ['error', 'except-parens'],

    // 禁止自身比较
    // https://eslint.org/docs/rules/no-self-compare
    'no-self-compare': 'error',

    // 禁用逗号操作符
    // https://eslint.org/docs/rules/no-sequences
    'no-sequences': 'error',

    // 禁止抛出异常字面量
    // https://eslint.org/docs/rules/no-throw-literal
    'no-throw-literal': 'error',

    // 禁用一成不变的循环条件
    // https://eslint.org/docs/rules/no-unmodified-loop-condition
    'no-unmodified-loop-condition': 'error',

    // 禁止出现未使用过的表达式
    // https://eslint.org/docs/rules/no-unused-expressions
    'no-unused-expressions': ['error', {
      allowShortCircuit: true,
      allowTernary: true,
      allowTaggedTemplates: true
    }],

    // 禁止不必要的 .call() 和 .apply()
    // https://eslint.org/docs/rules/no-useless-call
    'no-useless-call': 'error',

    // 禁止不必要的字符串字面量或模板字面量的连接
    // https://eslint.org/docs/rules/no-useless-concat
    'no-useless-concat': 'error',

    // 禁止多余的 return 语句
    // https://eslint.org/docs/rules/no-useless-return
    'no-useless-return': 'error',

    // 禁用 void 操作符
    // https://eslint.org/docs/rules/no-void
    'no-void': 'error',

    // 要求使用 Error 对象作为 Promise 拒绝的原因
    // https://eslint.org/docs/rules/prefer-promise-reject-errors
    'prefer-promise-reject-errors': 'error',

    // 要求 IIFE 使用括号括起来
    // https://cn.eslint.org/docs/rules/wrap-iife
    'wrap-iife': ['error', 'any', { functionPrototypeMethods: true }],

    // 要求或禁止 “Yoda” 条件
    // https://eslint.org/docs/rules/yoda
    yoda: ['error', 'never'],

    // ***** Variables 变量声明相关 *****
    // 禁止将变量初始化为 undefined
    // https://eslint.org/docs/rules/no-undef-init
    'no-undef-init': 'error',

    // 禁止在变量定义之前使用它们
    // https://eslint.org/docs/rules/no-use-before-define
    'no-use-before-define': ['error', { functions: false, classes: false, variables: false }],

    // ***** Stylistic Issues 风格指南 *****
    // 强制数组方括号中使用一致的空格
    // https://eslint.org/docs/rules/array-bracket-spacing
    'array-bracket-spacing': ['error', 'never'],

    // 禁止或强制在代码块中开括号前和闭括号后有空格
    // https://eslint.org/docs/rules/block-spacing
    'block-spacing': ['error', 'always'],

    // 强制在代码块中使用一致的大括号风格
    // https://eslint.org/docs/rules/brace-style
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],

    // 强制使用骆驼拼写法命名约定
    // https://eslint.org/docs/rules/camelcase
    camelcase: ['error', { properties: 'never' }],

    // 要求或禁止末尾逗号
    // https://eslint.org/docs/rules/comma-dangle
    'comma-dangle': ['error', {
      arrays: 'never',
      objects: 'never',
      imports: 'never',
      exports: 'never',
      functions: 'never'
    }],

    // 强制在逗号前后使用一致的空格
    // https://eslint.org/docs/rules/comma-spacing
    'comma-spacing': ['error', { before: false, after: true }],

    // 强制使用一致的逗号风格
    // https://eslint.org/docs/rules/comma-style
    'comma-style': ['error', 'last'],

    // 要求或禁止文件末尾存在空行
    // https://eslint.org/docs/rules/eol-last
    'eol-last': 'error',

    // 要求或禁止在函数标识符和其调用之间有空格
    // https://eslint.org/docs/rules/func-call-spacing
    'func-call-spacing': ['error', 'never'],

    // 强制使用一致的缩进
    // https://eslint.org/docs/rules/indent
    // 'indent':
    //   ['error', 2, {
    //     'SwitchCase': 1,
    //     'VariableDeclarator': 1,
    //     'outerIIFEBody': 1,
    //     'MemberExpression': 1,
    //     'FunctionDeclaration': { 'parameters': 1, 'body': 1 },
    //     'FunctionExpression': { 'parameters': 1, 'body': 1 },
    //     'CallExpression': { 'arguments': 1 },
    //     'ArrayExpression': 1,
    //     'ObjectExpression': 1,
    //     'ImportDeclaration': 1,
    //     'flatTernaryExpressions': false,
    //     'ignoreComments': false,
    //     'ignoredNodes': ['TemplateLiteral *']
    //   }],
    // 特殊处理：WebStorm 默认在 <script> 下首行缩进，原生的 ESLint 无法设置这种缩进，会提示错误，
    // 因此关闭 ESLint 原生规则，使用 eslint-plugin-vue 的规则代替
    indent: 'off',
    'vue/script-indent': ['error', 2, { baseIndent: 1, switchCase: 1 }],

    // 强制在对象字面量的属性中键和值之间使用一致的间距
    // https://eslint.org/docs/rules/key-spacing
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],

    // 强制在关键字前后使用一致的空格
    // https://eslint.org/docs/rules/keyword-spacing
    'keyword-spacing': ['error', { before: true, after: true }],

    // 要求构造函数首字母大写
    // https://eslint.org/docs/rules/new-parens
    'new-cap': ['error', { newIsCap: true, capIsNew: false, properties: true }],

    // 强制或禁止调用无参构造函数时有圆括号
    // https://eslint.org/docs/rules/new-parens
    'new-parens': 'error',

    // 禁用 Array 构造函数
    // https://eslint.org/docs/rules/no-array-constructor
    'no-array-constructor': 'error',

    // 禁止混合使用不同的操作符
    // https://eslint.org/docs/rules/no-mixed-operators
    'no-mixed-operators': ['error', {
      groups: [
        ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
        ['&&', '||'],
        ['in', 'instanceof']
      ],
      allowSamePrecedence: true
    }],

    // 禁止空格和 tab 的混合缩进
    // https://eslint.org/docs/rules/no-mixed-spaces-and-tabs
    'no-mixed-spaces-and-tabs': 'error',

    // 禁止出现多行空行
    // https://eslint.org/docs/rules/no-multiple-empty-lines
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],

    // 禁用 Object 的构造函数
    // https://eslint.org/docs/rules/no-new-object
    'no-new-object': 'error',

    // 禁用 tab
    // https://eslint.org/docs/rules/no-tabs
    'no-tabs': 'error',

    // 禁用行尾空格
    // https://eslint.org/docs/rules/no-trailing-spaces
    'no-trailing-spaces': 'error',

    // 禁止可以在有更简单的可替代的表达式时使用三元操作符
    // https://eslint.org/docs/rules/no-unneeded-ternary
    'no-unneeded-ternary': ['error', { defaultAssignment: false }],

    // 禁止属性前有空白
    // https://eslint.org/docs/rules/no-whitespace-before-property
    'no-whitespace-before-property': 'error',

    // 强制大括号内换行符的一致性
    // https://eslint.org/docs/rules/object-curly-newline
    'object-curly-newline': ['error', { multiline: true, consistent: true }],

    // 强制在大括号中使用一致的空格
    // https://eslint.org/docs/rules/object-curly-spacing
    'object-curly-spacing': ['error', 'always'],

    // 强制将对象的属性放在不同的行上
    // https://eslint.org/docs/rules/object-property-newline
    'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],

    // 强制函数中的变量要么一起声明要么分开声明
    // https://eslint.org/docs/rules/one-var
    'one-var': ['error', { initialized: 'never' }],

    // 强制操作符使用一致的换行符
    // https://eslint.org/docs/rules/operator-linebreak
    // 该规则与 ESLint Config for JavaScript Standard Style 设置成 after 冲突，
    // 但是 JavaScript Standard Style 并没有要求把换行符放在操作符后面的规则
    'operator-linebreak': ['error', 'before', { overrides: { '?': 'before', ':': 'before', '|>': 'before' } }],

    // 要求或禁止块内填充
    // https://eslint.org/docs/rules/padded-blocks
    'padded-blocks': ['error', { blocks: 'never', switches: 'never', classes: 'never' }],

    // 要求对象字面量属性名称用引号括起来
    // https://eslint.org/docs/rules/quote-props
    'quote-props': ['error', 'as-needed'],

    // 强制使用一致的反勾号、双引号或单引号
    // https://eslint.org/docs/rules/quotes
    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: false }],

    // 要求或禁止使用分号代替 ASI
    // https://eslint.org/docs/rules/semi
    semi: ['error', 'never'],

    // 强制分号之前和之后使用一致的空格
    // https://cn.eslint.org/docs/rules/semi-spacing
    'semi-spacing': ['error', { before: false, after: true }],

    // 强制在块之前使用一致的空格
    // https://eslint.org/docs/rules/space-before-blocks
    'space-before-blocks': ['error', 'always'],

    // 强制在 function的左括号之前使用一致的空格
    // https://cn.eslint.org/docs/rules/space-before-function-paren
    'space-before-function-paren': ['error', 'always'],

    // 强制在圆括号内使用一致的空格
    // https://eslint.org/docs/rules/space-in-parens
    'space-in-parens': ['error', 'never'],

    // 要求操作符周围有空格
    // https://eslint.org/docs/rules/space-infix-ops
    'space-infix-ops': 'error',

    // 强制在一元操作符前后使用一致的空格
    // https://eslint.org/docs/rules/space-unary-ops
    'space-unary-ops': ['error', { words: true, nonwords: false }],

    // 强制在注释中 // 或 /* 使用一致的空格
    // https://eslint.org/docs/rules/spaced-comment
    // 注：与官方文档属性有出入，不存在 line、block 这层设置
    'spaced-comment': ['error', 'always', {
      line: { markers: ['*package', '!', '/', ',', '='] },
      block: { balanced: true, markers: ['*package', '!', ',', ':', '::', 'flow-include'], exceptions: ['*'] }
    }],

    // 强制在 switch 的冒号左右有空格
    // https://eslint.org/docs/rules/switch-colon-spacing
    'switch-colon-spacing': ['error', { after: true, before: false }],

    // 要求或禁止在模板标记和它们的字面量之间有空格
    // https://eslint.org/docs/rules/template-tag-spacing
    'template-tag-spacing': ['error', 'never'],

    // 要求或禁止 Unicode 字节顺序标记 (BOM)
    // https://eslint.org/docs/rules/unicode-bom
    'unicode-bom': ['error', 'never'],

    // ***** ECMAScript 6 与 ES6 有关，即通常所说的 ES2015 *****
    // 要求箭头函数体使用大括号
    // https://eslint.org/docs/rules/arrow-body-style
    'arrow-body-style': ['error', 'as-needed'],

    // 要求箭头函数的参数使用圆括号
    // https://eslint.org/docs/rules/arrow-parens
    'arrow-parens': ['error', 'always'],

    // 强制箭头函数的箭头前后使用一致的空格
    // https://eslint.org/docs/rules/arrow-spacing
    'arrow-spacing': ['error', { before: true, after: true }],

    // 要求在构造函数中有 super() 的调用
    // https://eslint.org/docs/rules/constructor-super
    'constructor-super': 'error',

    // 强制 generator 函数中 * 号周围使用一致的空格
    // https://eslint.org/docs/rules/generator-star-spacing
    'generator-star-spacing': ['error', { before: true, after: true }],

    // 禁止修改类声明的变量
    // https://eslint.org/docs/rules/no-class-assign
    'no-class-assign': 'error',

    // 禁止修改 const 声明的变量
    // https://eslint.org/docs/rules/no-const-assign
    'no-const-assign': 'error',

    // 禁止类成员中出现重复的名称
    // https://eslint.org/docs/rules/no-dupe-class-members
    'no-dupe-class-members': 'error',

    // 禁止重复模块导入
    // https://eslint.org/docs/rules/no-duplicate-imports
    'no-duplicate-imports': ['error', { includeExports: true }],

    // 禁止 Symbolnew 操作符和 new 一起使用
    // https://eslint.org/docs/rules/no-duplicate-imports
    'no-new-symbol': 'error',

    // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
    // https://eslint.org/docs/rules/no-restricted-imports
    'no-this-before-super': 'error',

    // 禁止在对象中使用不必要的计算属性
    // https://eslint.org/docs/rules/no-useless-computed-key
    'no-useless-computed-key': 'error',

    // 禁止在 import 和 export 和解构赋值时将引用重命名为相同的名字
    // https://eslint.org/docs/rules/no-useless-rename
    'no-useless-rename': 'error',

    // 要求使用 let 或 const 而不是 var
    // https://eslint.org/docs/rules/no-var
    'no-var': 'error',

    // 要求或禁止对象字面量中方法和属性使用简写语法
    // https://eslint.org/docs/rules/object-shorthand
    'object-shorthand': ['error', 'always'],

    // 要求使用 const 声明那些声明后不再被修改的变量
    // https://eslint.org/docs/rules/prefer-const
    'prefer-const': ['error', { destructuring: 'all' }],

    // 要求使用扩展运算符而非 .apply()
    // https://eslint.org/docs/rules/prefer-spread
    'prefer-spread': 'error',

    // 要求使用模板字面量而非字符串连接
    // https://eslint.org/docs/rules/prefer-template
    'prefer-template': 'error',

    // 强制剩余和扩展运算符及其表达式之间有空格
    // https://eslint.org/docs/rules/rest-spread-spacing
    'rest-spread-spacing': ['error', 'never'],

    // 要求 symbol 描述
    // https://eslint.org/docs/rules/symbol-description
    'symbol-description': 'error',

    // 要求或禁止模板字符串中的嵌入表达式周围空格的使用
    // https://eslint.org/docs/rules/template-curly-spacing
    'template-curly-spacing': ['error', 'never'],

    // 强制在 yield* 表达式中 * 周围使用空格
    // https://eslint.org/docs/rules/yield-star-spacing
    'yield-star-spacing': ['error', 'both'],

    // ***** Priority B: Strongly Recommended (Improving Readability) *****
    // https://eslint.vuejs.org/rules/html-closing-bracket-newline.html
    'vue/html-closing-bracket-newline': ['error', { singleline: 'never', multiline: 'never' }],

    // https://eslint.vuejs.org/rules/html-self-closing.html
    // https://w3c.github.io/html-reference/syntax.html#syntax-elements
    // https://developer.mozilla.org/zh-CN/docs/Glossary/%E7%A9%BA%E5%85%83%E7%B4%A0
    'vue/html-self-closing': ['error', {
      html: {
        void: 'always',
        normal: 'never',
        component: 'never'
      },
      svg: 'always',
      math: 'always'
    }],

    // https://eslint.vuejs.org/rules/max-attributes-per-line.html
    'vue/max-attributes-per-line': ['error', {
      singleline: 3,
      multiline: {
        max: 1,
        allowFirstLine: false
      }
    }],

    // ***** Uncategorized *****
    // https://eslint.vuejs.org/rules/no-deprecated-scope-attribute.html
    // 'vue/no-deprecated-scope-attribute': ['error', 'always']

    // https://eslint.vuejs.org/rules/v-on-function-call.html
    // 注意该规则在校验多个特性的元素分多行撰写，每个特性一行的写法下可能会报TypeError: Cannot read property '0' of null错误，
    // 按照规则规定的处理即可
    'vue/v-on-function-call': ['error', 'never'],

    // https://eslint.vuejs.org/rules/v-slot-style.html
    'vue/v-slot-style': ['error', {
      atComponent: 'v-slot',
      default: 'shorthand',
      named: 'shorthand'
    }],

    // https://eslint.vuejs.org/rules/valid-v-slot.html
    'vue/valid-v-slot': 'error'
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)'
      ],
      env: {
        mocha: true
      }
    }
  ]
}
