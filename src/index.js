// aka Pattern.escape but not stdlib
function escapeRegExp(string){
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function join(repl) {
    return Object.keys(repl).map(escapeRegExp).join("|");
}

function objToMap(obj) {
    const m = new Map();
    Object.keys(obj).forEach(k => m.set("${" + k + "}", obj[k]));
    return m;
}

export default function ({types: t}) {
    return {
        name: "replace-properties",
        pre(state) {
            const r = state.opts.replacements || {};
            if (state.opts.debug) {
                console.log("Using replacements", r);
            }
            this.repls = objToMap(r);
            this.re = new RegExp("\\$\\{" + join(r) + "\\}", "g");
        },
        visitor: {
            StringLiteral(path) {
                if (this.repls.size === 0) {
                    return
                }
                const v = path.node.value;
                const r = v.replace(this.re, m => {
                    return this.repls.get(m);
                });
                path.node.value = r;
            }
        }
    };
}
