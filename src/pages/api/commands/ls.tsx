import { directory } from "@/pages/components/terminal";
import { fromRelativeDir } from "../fs";

export default {
    name: "ls",
    handler: (args: string[]) => {
        if (args.length > 1)
            return (<div>ls: too many arguments</div>)
        else if (args.length == 1) {
            let dir = args[0]
            return listEntries(dir)
        } else {
            return listEntries(directory)
        }
    }
}

function listEntries(dir: string): React.ReactNode {
    const packed = fromRelativeDir(dir);
    if (!packed)
        return (<div>ls: no such file or directory</div>)
    const [type, contents, fullPath] = packed
    if (type == "file")
        return (<div>{fullPath}</div>)
    const keys = Object.keys(contents)
    const mapped = keys.map(key => {
        return (
            <>
                <a className="silentlink" onClick={() => {
                    (document.querySelector("#command-input")! as any).value = `cat ${key}`
                }}> {key} </a>
                <br />
            </>
        )
    })

    return (
        <div>
            {mapped}
        </div>
    )
}