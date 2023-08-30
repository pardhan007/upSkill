// color design tokens export

// mui theme settings
export const themeSettings = (mode) => {
    return {
        palette: {
            mode: mode,
            ...(mode === "dark"
                ? {
                      // palette values for dark mode
                      primary: {
                          main: "#D7D4CF",
                          lightblue: "#757ce8",
                          lightdark: "#9BA4B5",
                          bordercolor: "#3F2E3E",
                      },
                  }
                : {
                      // palette values for light mode
                      primary: {
                          main: "#000000",
                          lightblue: "#757ce8",
                          lightdark: "#666666",
                          bordercolor: "#FFD1DA",
                      },
                  }),
        },
    };
};
