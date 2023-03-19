import { directory } from "@/pages/components/terminal"
import { fromRelativeDir } from "../fs"

export default {
    name: "pwd",
    description: "Prints current working directory",
    handler: (args: string[]) => {
        if (args.length != 0)
            return (<div>pwd: too many arguments</div>)
        return <div>{fromRelativeDir(directory)?.[2]}</div>
    }
}