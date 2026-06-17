import { Canvas } from "./canvas.js";
import { CodeRain } from "../../shared/animations/codeRain/codeRain.js";

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

            const animation = new CodeRain(canvas);
            animation.start();
        };
    }
}

const main = new Main();
