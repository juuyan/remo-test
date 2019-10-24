function scales(arr) {
  const spacingObj = {}
  arr.forEach(n => {
    spacingObj[`${n}`] = `${n / 2}rem`
  })
  return spacingObj
}
module.exports = {
  theme: {
    extend: {},
    spacing: scales([
      0,
      0.25,
      0.5,
      1,
      1.5,
      2,
      2.5,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      12,
      15,
      16,
      17,
      22,
      30,
      35,
      40,
      60,
      64,
      72,
      80,
      96,
      112,
    ]),
    boxShadow: {
      base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      float: '0 4px 6px -1px rgba(0, 0, 0, 0.24), 0 2px 4px -1px rgba(0, 0, 0, 0.32)',
      fly: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    },
    colors: {
      black: '#212027',
      secondary: '#383857',
      dark: '#718096',
      gray: '#a0aec0',
      light: '#eeeeee',
      lighter: '#f7f7f7',
      white: '#fff',
      primary: '#F09098',
      alert: '#E73326',
      transparent: 'transparent',
      facebook: '#4172B8',
      google: '#4285F4',
    },
  },
  variants: {},
  plugins: [],
}
