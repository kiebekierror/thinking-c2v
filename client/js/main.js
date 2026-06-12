import { Canvas } from "./canvas.js";

export class Main {
    constructor() {
        this.bootstrap();
    }

    bootstrap() {
        window.onload = () => {
            const canvas = new Canvas({
                parentElement: (() => {
                    const e = document.createElement("div");
                    document.body.append(e);
                    return e;
                })(),
            });
        };
    }
}

const main = new Main();
