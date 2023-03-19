export default {
    name: "echo",
    handler: (args: string[]) => {
        return (
            <div>
                {args.join("")}
            </div>
        )
    }
}