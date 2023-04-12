const spacing = {
  // Theme-specific spacing
  // Add here

  'header': 'var(--header-height)',
  'screen-less-header': 'var(--screen-less-header)',
  // General spacing
  // Add more granular measurements as needed
  'thin': '.125rem',
   // fractions
  '1/2': 100.0 * 1/2 + '%',
  '1/3': 100.0 * 1/3 + '%',
  '2/3': 100.0 * 2/3 + '%',
  '1/4': 100.0 * 1/4 + '%',
  '2/4': 100.0 * 2/4 + '%',
  '3/4': 100.0 * 3/4 + '%',
  '1/6': 100.0 * 1/6 + '%',
  '2/6': 100.0 * 2/6 + '%',
  '3/6': 100.0 * 3/6 + '%',
  '4/6': 100.0 * 4/6 + '%',
  '5/6': 100.0 * 5/6 + '%',
  '1/8': 100.0 * 1/8 + '%',
  '2/8': 100.0 * 2/8 + '%',
  '3/8': 100.0 * 3/8 + '%',
  '4/8': 100.0 * 4/8 + '%',
  '5/8': 100.0 * 5/8 + '%',
  '6/8': 100.0 * 6/8 + '%',
  '7/8': 100.0 * 7/8 + '%',
  // percents
  '0-per': '0%',
  '5-per': '5%',
  '10-per': '10%',
  '15-per': '15%',
  '20-per': '20%',
  '25-per': '25%',
  '30-per': '30%',
  '35-per': '35%',
  '40-per': '40%',
  '45-per': '45%',
  '50-per': '50%',
  '55-per': '55%',
  '60-per': '60%',
  '65-per': '65%',
  '70-per': '70%',
  '75-per': '75%',
  '80-per': '80%',
  '85-per': '85%',
  '90-per': '90%',
  '95-per': '95%',
};

for (let i = 0; i < 201; i++) {
  spacing[i] = `${i/4.000}rem`
}

module.exports = {
  content: ["./**/*.{liquid,svg,js}"],
  mode: 'jit',
  plugins: [],
  safelist: [
    { pattern: /shopify-/ },
  ],
  content: [
    './**/*.{svg,js,liquid,json}',
  ],
  theme: {
    colors: {
      "transparent": "transparent",
      "black": "#000",
      "white": '#fff',
      "grey": "#EFEEEC"
    },
    letterSpacing: {
    },
    fontSize: {
      'h1-lg': ['2.875rem', { // 46px
        lineHeight: '1.4',
        letterSpacing: '-0.01em',
      }],
      'h1-sm': ['2rem', { // 32px
        lineHeight: '1.3',
        letterSpacing: '-0.01em',
      }],
      'h2-lg': ['2rem', { // 32px
        lineHeight: '1.2',
        letterSpacing: '-0.01em',
      }],
      'h2-sm': ['1.25rem', { // 20px
        lineHeight: '1.2',
        letterSpacing: '-0.01em',
      }],
      'h3-lg': ['1.125rem', { // 18px
        lineHeight: '1.3',
        letterSpacing: '-0.01em',
      }],
      'h3-sm': ['1rem', { // 16px
        lineHeight: '1.3',
        letterSpacing: '0.03em',
      }],
      'label-lg': ['0.875rem', { // 14px
        lineHeight: '1.3',
        letterSpacing: '0.03em',
      }],
      'label-md': ['0.75rem', { // 12px
        lineHeight: '1.3',
        letterSpacing: '0.04em',
      }],
      'label-sm': ['0.6875rem', { // 11px
        lineHeight: '1.3',
        letterSpacing: '0.03em',
      }],
      'body-lg': ['1rem', { // 16px
        lineHeight: '1.4',
        letterSpacing: '0.03em',
      }],
      'body-sm': ['0.875rem', { // 14px
        lineHeight: '1.4',
        letterSpacing: '0.03em',
      }],
      'body-sm-tight': ['0.875rem', { // 14px
        lineHeight: '1.4',
        letterSpacing: '0',
      }],
    },
    fontFamily: {
      serif: 'serif'
    },
    extend: {
      screens: {
        'hoverable': { 'raw': '(hover: hover)' }
      },
      spacing: spacing,
      maxWidth: spacing,
      maxHeight: spacing,
      minWidth: spacing,
      minHeight: spacing,
      width: {
        "max-content": "max-content"
      }
    }
  }
}
