import React, { useState, useRef, useEffect, ReactNode } from "react";
import { executeCommand } from "../api/command"
import neofetch from "../api/commands/neofetch";

type OutputLine = {
    type: "command" | "component";
    id: number,
    dir: string,
    value: React.ReactNode | (() => React.ReactNode);
};

const CommandSymbol: string = "➜"
const RememberCommandAmount: number = 10

let directorySnapshot: string = "/home/maxus"
let internalClipboard: string | null = null
export let directory: string = "/home/maxus"
export function setDirectory(value: string) {
    directory = value
}
export function setInternalClipboard(value: string) {
    (document.querySelector("#command-input") as any).value = value
    internalClipboard = value
}

let loaded = false

function handleHistoryMapping(line: OutputLine): ReactNode {
    switch (line.type) {
        case "command":
            return (
                <div key={line.id} onClick={focus}>
                    <br />
                    <span className="dir gradient">{line.dir.replace("/home/maxus", "~")}</span>
                    <div className="command">
                        <div className="command-symbol yellow">{CommandSymbol} </div>
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


const Terminal: React.FC = () => {
    const [command, setCommand] = useState("");
    const [output, setOutput] = useState<OutputLine[]>([]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [commandHistoryIndex, setCommandHistoryIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.scrollIntoView({ behavior: "instant" });
        }
    }, [output])

    useEffect(() => {
        if (loaded)
            return;
        loaded = true;
        setOutput([
            {
                type: "command",
                dir: directory,
                value: "neofetch",
                id: 1
            },
            {
                type: "component",
                dir: "",
                value: () => neofetch.handler([]),
                id: 2
            }
        ])
        const stored = localStorage.getItem("commandHistory");
        if (stored)
            setCommandHistory(JSON.parse(stored));
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
                id: Math.floor(Math.random() * 2147483648)
            },
            {
                type: "component",
                dir: "",
                wasError: false,
                value: () => result,
                id: Math.floor(Math.random() * 2147483648)
            }
        ])
        setCommand("");
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        internalClipboard = null
        setCommand(event.target.value);
    };

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            const input: string = internalClipboard ? internalClipboard.trim() : command.trim()
            internalClipboard = null
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
                        value: "",
                        id: Math.floor(Math.random() * 2147483648)
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
            <div id="terminal-history">
                {
                    output.map(line => handleHistoryMapping(line))
                }
            </div>

            <div id="command-line" onClick={() => focus()}>
                <br />
                <span className="dir gradient">{directory.replace("/home/maxus", "~")}</span>
                <div className="command">
                    <div className="command-symbol yellow">{CommandSymbol} </div>
                    <input
                        id="command-input"
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
