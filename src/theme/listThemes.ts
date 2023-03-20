export type ThemeUnit = {
    // background color in list
    background: string;
    // text color in list toolbar
    text: string;
}

export type ListTheme = {
    light: ThemeUnit;
    dark: ThemeUnit;
}

type themeDict = {
    [key: string]: ListTheme;
}


export const listThemes: themeDict = {
    "green": {
        light: {
            "background": "#2A835D",
            "text": "white",
        },
        dark: {
            "background": "#080808",
            "text": "#4AA079",
        }
    }
}
