export async function getTheme(theme) {
    return new Promise((resolve, reject) => {
        switch (theme) {
            case "orange":
                require.ensure([], () => {
                    require("./orange.less");
                }, "orange.css");
                break;
            default:
            case "blue":
                require.ensure([], () => {
                    require("./blue.less");
                }, "blue.css");
                break;
        }
        resolve(true);
    });
}