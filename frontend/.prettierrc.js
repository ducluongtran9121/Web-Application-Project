module.exports = {
  tabWidth: 2,
  trailingComma: 'all',
  singleQuote: true,
  semi: false,
  importOrder: [
    '^(@chakra-ui|framer|react-icons|focus-visible)(.*)$',
    '^[./]+(assets*)(.*)$',
    '^[./]+(models)(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
  importOrderSortSpecifiers: true,
}
