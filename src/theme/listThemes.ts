export type ThemeUnit = {
  // icon color
  icon: string;
  // background color in list
  background: string;
  // text color in list toolbar
  text: string;
  // if is reversed color theme
  reversed?: boolean;
}

export type ListTheme = {
  light: ThemeUnit;
  dark: ThemeUnit;
}

type themeDict = {
  [key: string]: ListTheme;
}

export const listThemes: themeDict = {
  'green': {
    light: {
      'icon': '#2A835D',
      'background': '#2A835D',
      'text': '#FFFFFF',
    },
    dark: {
      'icon': '#4AA079',
      'background': '#080808',
      'text': '#4AA079',
    }
  },
  'pink': {
    light: {
      'icon': '#C14C6C',
      'background': '#C14C6C',
      'text': '#FFFFFF',
    },
    dark: {
      'icon': '#E46C8C',
      'background': '#080808',
      'text': '#E46C8C',
    }
  },
  'darkgreen-reverse': {
    light: {
      'icon': '#166F6B',
      'background': '#D4F1EF',
      'text': '#166F6B',
      reversed: true,
    },
    dark: {
      'icon': '#8BD3CE',
      'background': '#080808',
      'text': '#9BD1CD',
      reversed: true,
    }
  },
  'lightpink-reverse': {
    light: {
      'icon': '#A84329',
      'background': '#F9E8DE',
      'text': '#A84329',
      reversed: true,
    },
    dark: {
      'icon': '#ECBDA2',
      'background': '#080808',
      'text': '#ECBDA2',
      reversed: true,
    }
  },
  'purple': {
    light: {
      'icon': '#5C70BE',
      'background': '#5C70BE',
      'text': '#FFFFFF',
    },
    dark: {
      'icon': '#788CDE',
      'background': '#080808',
      'text': '#788CDE',
    }
  }
}
