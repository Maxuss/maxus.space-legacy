import Image from "next/image"
import favicon from "../../../../public/favicon-300.png"

export default {
    name: "neofetch",
    description: "Displays general info about me!",
    handler: (_: string[]) => {
        return (
            <div className="neofetch h-card">
                <Image
                    src={favicon}
                    alt="Avatar"
                    width={300}
                    height={300}
                    className="neofetch-img u-logo"
                />

                <div className="neofetch-text">
                    <b className="purple">maxus</b>
                    @
                    <b className="purple">maxus.space</b>
                    <br />
                    <b>-----------------</b>
                    <br />
                    hi!!
                    <br />
                    i&apos;m <span className="dark-purple">maxus</span>
                    <br />
                    i code, mostly for minecraft but i have also made
                    <br />
                    lots of other cool stuff, check it out too!
                    <br />
                    i&apos;m fluent in
                    <span className="gradient rust-color"> Rust</span>,
                    <span className="gradient kotlin-color"> Kotlin</span>,
                    <span className="gradient java-color"> Java</span> and
                    <span className="gradient csharp-color"> C#</span>.
                    <br />
                    i am also a horrible web dev, but i&apos;m still learning!!
                    <br />
                    <br />

                    <b>links</b>:&nbsp;
                    <a className="purple" href="https://github.com/Maxuss" rel="me noreferrer" target="_blank">github</a>&nbsp;
                    <a className="purple" href="https://www.youtube.com/@maxus2144" rel="me noreferrer" target="_blank">youtube</a>&nbsp;
                    <a className="purple underline" onClick={() => alert("COMING SOON")} rel="me noreferrer" target="_blank">blog</a>&nbsp;
                    <br />

                    <b>contact</b>:&nbsp;
                    <a className="purple u-mail" href="mailto:me@maxus.space" rel="me">email</a>&nbsp;
                    <a className="purple" id="discord" onClick={() => navigator.clipboard.writeText("maxus#8805")}>
                        <span className="underline">discord</span>
                    </a>&nbsp;
                    <a className="purple" href="https://matrix.to/#/@xtremum:matrix.org" rel="me noreferrer" target="_blank">matrix</a>

                    <br />
                    <br />

                    <pre>
                        <span className="bright-black-bg">   </span>
                        <span className="bright-blue-bg">   </span>
                        <span className="bright-green-bg">   </span>
                        <span className="bright-yellow-bg">   </span>
                        <span className="bright-red-bg">   </span>
                        <span className="bright-purple-bg">   </span>
                        <span className="bright-cyan-bg">   </span>
                        <span className="bright-white-bg">   </span>
                    </pre>
                    <pre style={{ marginTop: "-0.2em" }}>
                        <span className="black-bg">   </span>
                        <span className="blue-bg">   </span>
                        <span className="green-bg">   </span>
                        <span className="yellow-bg">   </span>
                        <span className="red-bg">   </span>
                        <span className="purple-bg">   </span>
                        <span className="cyan-bg">   </span>
                        <span className="white-bg">   </span>
                    </pre>
                </div>
            </div >
        )
    }
}