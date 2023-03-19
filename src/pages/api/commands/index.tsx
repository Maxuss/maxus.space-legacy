import { EmulatedCommand } from "../command"
import cat from "./cat"
import cd from "./cd"
import clear from "./clear"
import echo from "./echo"
import help from "./help"
import ls from "./ls"
import neofetch from "./neofetch"
import pwd from "./pwd"
import rat from "./rat"

const aggregated: EmulatedCommand[] = [
    echo,
    help,
    clear,
    cd,
    ls,
    cat,
    pwd,
    neofetch,
    rat,
]

export default aggregated