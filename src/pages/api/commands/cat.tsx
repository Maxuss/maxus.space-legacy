import { fromRelativeDir } from "../fs"

export default {
    name: "cat",
    handler: (args: string[]) => {
        if (args.length === 0 || args[0] === "--help" || args[0] === "-h")
            return (<div>
                Usage: cat [FILE]...
                <br />
                Concatenate FILE(s) to standard output.
                <br />
                -h, --help          Prints this message
            </div>)

        const aggregated: React.ReactNode[] = []
        for (const path of args) {
            const packed = fromRelativeDir(path)
            if (!packed) {
                aggregated.push(<span>cat: {path}: No such file or directory</span>);
                continue
            }
            const [type, contents, _] = packed
            console.log(type, contents, type === "directory")
            if (type === "directory") {
                aggregated.push(<span>cat: {path}: Is a directory</span>)
                continue
            }
            const actualContents = contents as React.ReactNode
            aggregated.push(<div>
                {actualContents}
            </div>)
        }
        return (<div>
            {aggregated}
        </div>)
    }
}