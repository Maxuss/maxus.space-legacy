import React, { useState, useRef, useEffect, ReactNode } from "react";
import { executeCommand } from "../api/command"

type OutputLine = {
    type: "command" | "component";
    dir: string,
    value: React.ReactNode | (() => React.ReactNode);
};

const CommandSymbol: string = ">"
const RememberCommandAmount: number = 10

function handleHistoryMapping(line: OutputLine): ReactNode {
    switch (line.type) {
        case "command":
            return (
                <div onClick={focus}>
                    <br />
                    <span className="dir">{line.dir.replace("/home/maxus", "~")}</span>
                    <div className="command">
                        <div className="command-symbol">{CommandSymbol} </div>
                        {line.value as ReactNode}
                    </div>
                </div>
            )
        case "component":
            return (
                <div onClick={focus}>
                    {typeof line.value == "function" ? line.value() : line.value}
                </div>
            )
    }
}

let directorySnapshot: string = "/home/maxus"
export let directory: string = "/home/maxus"

export function setDirectory(value: string) {
    directory = value
}

const Terminal: React.FC = () => {
    const [command, setCommand] = useState("");
    const [output, setOutput] = useState<OutputLine[]>([]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [commandHistoryIndex, setCommandHistoryIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.scrollIntoView({ behavior: "instant" })
        }
    }, [output])

    useEffect(() => {
        const stored = localStorage.getItem("commandHistory")
        if (stored)
            setCommandHistory(JSON.parse(stored))
    }, [])

    const handleCommand = (command: string) => {
        directorySnapshot = directory
        const result = executeCommand(command)
        setOutput((prevOutput) => [
            ...prevOutput,
            {
                type: "command",
                dir: directorySnapshot,
                value: command,
            },
            {
                type: "component",
                dir: "",
                value: () => result
            }
        ])
        setCommand("");
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCommand(event.target.value);
    };

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            const input: string = command.trim()
            if (input) {
                handleCommand(input);

                setCommandHistory((history) => [...history.slice(-RememberCommandAmount), command])
                setCommandHistoryIndex(-1);
                localStorage.setItem("commandHistory", JSON.stringify([...commandHistory.slice(-RememberCommandAmount), command]))
            } else {
                setOutput((prevOutput) => [
                    ...prevOutput,
                    {
                        type: "command",
                        dir: directory,
                        value: ""
                    }
                ]);
            }
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            if (commandHistoryIndex < commandHistory.length - 1) {
                setCommandHistoryIndex((index) => index + 1);
                setCommand(commandHistory[commandHistory.length - commandHistoryIndex - 2]);
            }
        } else if (event.key === "ArrowDown") {
            event.preventDefault();
            if (commandHistoryIndex >= 0) {
                setCommandHistoryIndex((index) => index - 1);
                setCommand(
                    commandHistoryIndex === 0 ? "" : commandHistory[commandHistory.length - commandHistoryIndex - 2]
                );
            }
        }
    };

    return (
        <div className="terminal">
            <div className="terminal-history">
                {
                    output.map(line => handleHistoryMapping(line))
                }
            </div>

            <div id="command-line" onClick={() => focus()}>
                <br />
                <span className="dir">{directory.replace("/home/maxus", "~")}</span>
                <div className="command">
                    <div className="command-symbol">{CommandSymbol} </div>
                    <input
                        type="text"
                        ref={inputRef}
                        value={command}
                        onChange={handleInputChange}
                        onKeyDown={handleInputKeyDown}
                        className="input-prompt"
                        autoCapitalize="off"
                        autoFocus={false}
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck="false"
                    />
                </div>
            </div>
        </div >
    );
};


export default Terminal;
