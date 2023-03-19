import { setDirectory } from "@/pages/components/terminal"
import { fromRelativeDir } from "../fs"

export default {
    name: "cd",
    description: "Changes current directory to the provided one",
    handler: (args: string[]) => {
        if (args.length == 0) {
            setDirectory("~");
            return "";
        }
        else if (args.length > 1)
            return (<div>cd: too many arguments</div>);
        const path = args[0];
        const packed = fromRelativeDir(path);
        if (!packed)
            return (<div>cd: no such file or directory</div>)
        const [type, _, fullPath] = packed
        if (type === "file")
            return (<div>cd: not a directory: {path}</div>)

        setDirectory(fullPath)
    }
}