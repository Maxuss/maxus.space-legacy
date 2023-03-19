import { directory } from "../components/terminal";

export type EmulatedFsElement = { [key: string]: EmulatedFsElement } | (() => React.ReactNode) | React.ReactNode

const root: { [key: string]: EmulatedFsElement } = {
    "dev": {
        "random": () => (<div>{Math.floor(Math.random() * 2147483648)}</div>)
    },
    "home": {
        "maxus": {
            "test.txt": (<div>There must be something interesting here.<br />But there really isn&apos;t</div>)
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
