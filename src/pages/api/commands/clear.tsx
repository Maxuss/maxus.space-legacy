export default {
    name: "clear",
    description: "Clears console",
    handler: (_: string[]) => {
        (document.querySelector("#terminal-history") as any).innerHTML = "";
        return ""
    }
}