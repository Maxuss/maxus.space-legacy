export default {
    name: "echo",
    description: "Echoes entered text",
    handler: (args: string[]) => {
        return (
            <div>
                {args.join("")}
            </div>
        )
    }
}