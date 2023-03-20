export const setStatusbarColor = (color: string) => {
    // @ts-ignore
    document.querySelector("meta[name='theme-color']").setAttribute("content", color);
}
