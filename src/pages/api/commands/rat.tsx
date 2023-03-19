import Image from "next/image"
import img from "../../../../public/rat.gif"

export default {
    name: "rat",
    handler: (_: string[]) => {
        return (
            <Image
                src={img}
                alt="the pizza rat"
                width={500}
                height={500}
            />
        )
    }
}