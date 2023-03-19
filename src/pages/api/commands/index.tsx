import { EmulatedCommand } from "../command"
import echo from "./echo"
import rat from "./rat"

const aggregated: EmulatedCommand[] = [
    echo,
    rat,
]

export default aggregated