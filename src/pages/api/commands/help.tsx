import aggregated from "."

export default {
    name: "help",
    description: "Prints this help message",
    handler: (_: string[]) => {
        const text: React.ReactNode[] = [
            <><div><b>All commands:</b></div><br /></>
        ]
        for (const command of aggregated) {
            text.push(
                <>
                    <b>{command.name}</b> - {command.description}<br />
                </>
            )
        }
        return text
    }
}