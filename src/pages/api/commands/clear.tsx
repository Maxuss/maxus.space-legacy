export default {
    name: "clear",
    handler: (_: string[]) => {
        (document.querySelector("#terminal-history") as any).innerHTML = "";
        return ""
    }
}