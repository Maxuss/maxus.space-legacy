import { EmulatedCommand } from "../command"
import cd from "./cd"
import echo from "./echo"
import rat from "./rat"

const aggregated: EmulatedCommand[] = [
    echo,
    rat,
    cd
]

export default aggregated