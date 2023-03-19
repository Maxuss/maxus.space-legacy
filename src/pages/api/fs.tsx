import Image from "next/image";
import { directory, setInternalClipboard } from "../components/terminal";

export type EmulatedFsElement = { [key: string]: EmulatedFsElement } | (() => React.ReactNode) | React.ReactNode

const root: { [key: string]: EmulatedFsElement } = {
    "dev": {
        "random": () => (<div>{Math.floor(Math.random() * 2147483648)}</div>)
    },
    "home": {
        ".secret": {
            "ULTRAKILL.exe": (<div>No wine preinstalled, so no ULTRAKILL for you :(</div>),
            "DOOM64.exe": (<div>
                It doesn&apos;t work :(
            </div >),
            "boys": (<div>catboys!!</div>)
        },
        "maxus": {
            "README": (
                <div>
                    <b>hi!!</b><br />
                    here are some projects i have made that you might be interested in: <br />
                    <span className="bright-black">Tip: all commands are copyable! just click on them!</span>
                    <br />
                    * <b className="purple">Macrocosm</b>: <a className="silentlink" onClick={() => setInternalClipboard("cd ~/projects/Macrocosm")}>cd ~/projects/Macrocosm</a><br />
                    * <b className="red">ChatGPT-rs</b>: <a className="silentlink" onClick={() => setInternalClipboard("cd ~/projects/chatgpt_rs")}>cd ~/projects/chatgpt_rs</a><br />
                    * <b className="blue">SharpFunction</b>: <a className="silentlink" onClick={() => setInternalClipboard("cd ~/projects/SharpFunction")}>cd ~/projects/SharpFunction</a><br />

                </div>
            ),
            "test.txt": (<div>There must be something interesting here.<br />But there really isn&apos;t</div>),
            "inspiration.txt": (<div>
                main inspiration for this design is<br />
                the linux terminal (obviously), but i also<br />
                took the CSS (and the style idea generally) from <br />
                <a className="purple" href="https://oat.zone" target="_blank">this</a> website by oatmealine.<br />
                credits to her!
            </div>),
            "projects": {
                "Macrocosm": {
                    "lore-bible": (<div>No, I am not giving it away lmao</div>),
                    "credits.txt": (
                        <div>
                            <b>blukinto</b> - for <span className="red">amazing</span> sprites<br />
                            <b>swim</b> - for buying me Arceon, so i can build 20% faster
                        </div>
                    ),
                    "random-sprite.png": () => {
                        const randomSprite = determineRandomMacrocosmSprite()
                        return (<Image
                            src={randomSprite}
                            alt="A random macrocosm sprite"
                            width={256}
                            height={256}
                            className="sprite"
                        />)
                    },
                    "about": (<div>
                        <span className="gradient kotlin-color">Macrocosm</span> is a Hypixel Skyblock-inspired server plugin<br />
                        for Minecraft version <em>(insert latest mc version)</em>. <br />
                        It adds lots of unique RPG items, mobs, bosses and locations,<br />
                        as well as a hand-made map!
                        <br />
                        <br />
                        You can follow Macrocosm development here:<br />
                        <b> * Github: </b> <a href="https://github.com/Maxuss/Macrocosm" rel="me noreferrer" target="_blank">Maxuss/Macrocosm</a><br />
                        <b> * Discord: </b> <span className="gradient rust-color">Coming Soon!</span>
                    </div>)
                },
                "chatgpt_rs": {
                    "about": (<div>
                        <span className="gradient rust-color">ChatGPT-rs</span> is a wrapper around the recently-released<br />
                        <span className="gradient java-color">OpenAI ChatGPT</span> API for the <span className="gradient rust-color">Rust</span> programming language<br />
                        It currently has over <span className="yellow">40 stars</span>, so go and check it out! <br />
                        <br />
                        <b> * Github: </b> <a href="https://github.com/Maxuss/chatgpt_rs" rel="me noreferrer" target="_blank">Maxuss/chatgpt_rs</a><br />
                    </div>)
                },
                "SharpFunction": {
                    "about": (<div>
                        <span className="gradient csharp-color">SharpFunction</span> and <span className="gradient csharp-color">CopperSharp</span> were two <span className="gradient csharp-color">C#</span> libraries, that made<br />
                        it possible to generate Minecraft datapacks using C#. <br />
                        Unfortunately, I have abandoned both of them, due to bad design. <br />
                        If you are looking for a <b>replacement</b> for these libraries, <br />
                        I am working on (a frozen) library for <span className="gradient rust-color">Rust</span> with the same goal, <br />
                        it is called <em className="gradient rust-color">flux</em>, check it out! <br />
                        <br />
                        <b> * Github: </b> <a href="https://github.com/Maxuss/flux" rel="me noreferrer" target="_blank">Maxuss/Macrocosm</a><br />
                    </div>)
                }
            }
        }
    },
    "root.txt": (<div>Some root text here idk</div>)
}

export function fromAbsDir(p: string): null | ["file", React.ReactNode, string] | ["directory", { [key: string]: EmulatedFsElement }, string] {
    p = p.replace(/\/[^\s/]+\/\.\./, '');
    p = p.replace(/\/\.\//, '');
    p = p.replace(/\/\.$/, '');
    p = p.replace(/\/+/, '/');
    p = p.slice(1);

    let content: any = root;
    let path = '';

    if (p.length === 0) {
        path = '/';
    } else {
        for (let v of p.split('/')) {
            content = content![v];
            path = path + '/' + v;
            if (!content) return null;
        }
    }

    if (isDir(content)) {
        return ["directory", content as { [key: string]: EmulatedFsElement }, path]
    } else {
        return ["file", typeof content === "function" ? content() as React.ReactNode : content as React.ReactNode, path]
    }
}

export function fromRelativeDir(p: string): null | ["file", React.ReactNode, string] | ["directory", { [key: string]: EmulatedFsElement }, string] {
    if (p.startsWith('~')) p = '/home/maxus' + p.slice(1);
    if (p.startsWith('/')) return fromAbsDir(p);
    return fromAbsDir(directory + '/' + p);
}

function isDir(element: EmulatedFsElement): element is { [key: string]: EmulatedFsElement } {
    return typeof element !== "function" && !("$$typeof" in (element as any))
}

function determineRandomMacrocosmSprite() {
    return `https://raw.githubusercontent.com/Maxuss/Macrocosm/master/src/main/resources/pack/assets/macrocosm/textures/item/${macrocosmSprites[Math.floor(Math.random() * macrocosmSprites.length)]}.png`
}

const macrocosmSprites = [
    "adamantine_bar",
    "calamity",
    "cataclysm",
    "catastrophe",
    "geyserite",
    "lumium_bar",
    "mithril_bar",
    "raw_adamantine",
    "raw_lumium",
    "raw_mithril",
    "raw_titanium",
    "raw_silver",
    "silver_ingot",
    "titanium_ingot"
]