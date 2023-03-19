import React, { useState } from "react";

const Terminal = () => {
    const [output, setOutput] = useState([]);

    const handleCommand = (command) => {
        // Your logic for executing commands goes here
    };

    const handleInput = (event) => {
        if (event.key === "Enter") {
            const command = event.target.value;
            setOutput((prevOutput) => [...prevOutput, { type: "input", value: command }]);
            handleCommand(command);
            event.target.value = "";
        }
    };

    return (
        <div>
            {output.map((line, index) => {
                if (line.type === "input") {
                    return <p key={index}>$ {line.value}</p>;
                } else if (line.type === "component") {
                    const Component = line.value;
                    return <Component key={index} />;
                } else {
                    return <p key={index}>{line.value}</p>;
                }
            })}
            <p>$ <input onKeyDown={handleInput} /></p>
        </div>
    );
};

export default Terminal;
