module.exports = {
	'root': true,
	'extends': [
		'react-app',
		'react-app/jest'
	],
	'rules': {
		'quotes': ['warn', 'single'],
		'max-len': ['warn', { 'code': 100 }],
		'indent': ['warn', 'tab', {'SwitchCase': 1}],
		'semi': ['warn', 'always'],
		'eol-last': ['warn', 'always'],
		'spaced-comment': ['warn', 'always', { 'markers': ['/'] }],
		'prefer-const': 'warn',
		'import/no-anonymous-default-export': [2, {'allowObject': true}]
	},
	'overrides': [
		{
			'files': ['**/*.ts?(x)'],
			'rules': {
				'jsx-quotes': ['warn', 'prefer-single']
			}
		}
	]
}
