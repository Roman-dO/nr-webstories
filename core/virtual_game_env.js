import GAME_ENV from "./game_env.js";

export class Story {
    static nodes = [];
    static cur_node_n = 0;
    static cur_node = () => this.nodes[this.cur_node_n];

    static CreateNode(node) {
        this.nodes[node.id] = new Node(node.title, node.text, node.vars);
    }

    static SetupNodes(nodes) {
        if (!nodes) {
            console.error('Файл истории поврежден, объект nodes должен существовать.');
        }

        for (let node_i = 0; node_i < nodes.length; node_i++) {
            this.CreateNode(nodes[node_i]);
        }
    }

    static Setup(nodes, cur_node=0) {
        this.SetupNodes(nodes);
        this.cur_node_n = cur_node;
    }

    static OpenNode(n) {
        if (!this.nodes[n]) {
            console.error(`node ${n} is undefined.`);
            n = 0;
        }

        this.cur_node_n = n;

        const cur_node = this.cur_node();
        GAME_ENV.UploadNode(cur_node.title, cur_node.text, cur_node.vars);
    }
}

export class Node {
    text = '';

    title = '';

    vars = [];

    constructor(title, text, vars) {
        this.title = title;
        this.text = text;

        this.vars = vars;
    }
}