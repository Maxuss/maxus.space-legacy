import commands from "./commands"

type EmulatedCommand = {
    name: string,
    description: string,
    handler: (args: string[]) => React.ReactNode
}

function executeCommand(input: string): React.ReactNode {
    const split = input.split(" ");
    const cmd = split.shift();
    for (const { name, handler } of commands) {
        if (name === cmd) {
            return handler(split);
        }
    }
    return (<div>bash: command not found: {cmd}</div>)
}

export { executeCommand };
export type { EmulatedCommand };

