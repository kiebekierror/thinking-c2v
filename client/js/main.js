export class Main {
    /**
     * 負責創建 `document.createElement("canvas")` 並 append 到 body.
     *
     * 控制 canvas 的基礎的 size, scale.
     */
    constructor() {
        this.defaultCanvasHeight = 1920;
        this.defaultCanvasWidth = 1080;
        this.html = document.querySelector("html");
        this.body = document.querySelector("body") || document.body;
        this.canvas = this.#createCanvas();
        this.ctx = this.canvas.getContext("2d");
        this.body.prepend(this.canvas);
        this.runOnresize();
        window.onresize = () => this.runOnresize();
    }

    #createCanvas() {
        const c = document.createElement("canvas");
        const { defaultCanvasWidth: w, defaultCanvasHeight: h } = this;
        const hw = { h: h, w: w, min: Math.min(h, w), max: Math.max(h, w) };
        const minDmax = hw.min / hw.max;
        const maxDmin = hw.max / hw.min;

        c.height = hw.h;
        c.width = hw.w;
        c.style.aspectRatio = "9/16";
        return c;
    }

    runOnresize() {
        const { canvas } = this;
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;

        this.#htmlBody();
        this.#resize();
        this.#drawRect();
    }

    #htmlBody() {
        const { html, body } = this;
        html.style.height = `${window.innerHeight}px`;
        html.style.width = `${window.innerWidth}px`;

        body.style.height = `${window.innerHeight}px`;
        body.style.width = `${window.innerWidth}px`;
    }

    #calcWidth(a, b, c) {
        return (a - b * c) * 0.5;
    }

    #calcHeight(a, b, c) {
        return (a - b + b * c) * 0.5;
    }

    #resize() {
        const { canvas } = this;
        canvas.height = this.defaultCanvasHeight;
        canvas.width = this.defaultCanvasWidth;
        const { innerHeight: wHeight, innerWidth: wWidth } = window;
        // this.#setPosition(canvas);
        let translateStr = "translate(-150%, -150%)";
        let scale = 1;
        if (wHeight < wWidth) {
            const translate = [];
            canvas.style.background = "rgba(255,0,0,.5)";
            scale = wHeight / canvas.height;
            canvas.style.scale = scale;
            translate.push(this.#calcWidth(wWidth, canvas.width, scale));
            translate.push(this.#calcHeight(canvas.height, wHeight, scale));

            translateStr = `translate(-${translate[0]}px, -${translate[1]}px)`;
            canvas.style.transform = `${translateStr}`;
        } else {
            canvas.style.background = "#0f0";
            scale = wWidth / canvas.width;
            canvas.style.scale = scale;
            canvas.style.transform = `translate(-${wWidth * (1 + scale)}px, 0px)`;
        }
    }

    #setPosition() {
        const { canvas } = this;
        canvas.style.position = "absolute";
        canvas.style.top = "50%";
        canvas.style.left = "50%";
        canvas.style.transform = `${canvas.style.transform} translate(-50%, -50%)`;
    }

    #drawRect() {
        const num = 10;
        const { ctx } = this;
        const { height, width } = ctx.canvas;
        ctx.translate = 0;
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.rect(num, num, width - num * 2, height - num * 2);
        ctx.stroke();

        ctx.fillStyle = "rgba(0, 225, 255, 1)";
        ctx.textBaseline = "middle";
        ctx.font = "bold 90px Arial";
        ctx.fillText(`n:${num},W:${width},H:${height}`, 100, 100);
        ctx.fillText(`wH:${window.innerHeight}`, 100, 200);
        ctx.fillText(`wW:${window.innerWidth}`, 100, 300);
    }
}

const m = new Main();
const ctx = m.ctx;
const c = m.canvas;

// window.onload = () => {
// };
