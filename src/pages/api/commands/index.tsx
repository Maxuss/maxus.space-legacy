import { EmulatedCommand } from "../command"
import cat from "./cat"
import cd from "./cd"
import clear from "./clear"
import echo from "./echo"
import ls from "./ls"
import rat from "./rat"

const aggregated: EmulatedCommand[] = [
    echo,
    rat,
    cd,
    ls,
    cat,
    clear
]

export default aggregated