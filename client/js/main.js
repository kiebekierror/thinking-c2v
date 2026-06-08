export class Main {
    /**
     * 負責創建 `document.createElement("canvas")` 並 append 到 body.
     *
     * 控制 canvas 的基礎的 size, scale.
     */
    constructor() {
        // console.clear();

        this.scale = 1;
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
        const { defaultCanvasWidth: dcw, defaultCanvasHeight: dch } = this;
        const chw = {
            h: dch,
            w: dcw,
            min: Math.min(dch, dcw),
            max: Math.max(dch, dcw),
        };
        const minDmax = chw.min / chw.max;
        const maxDmin = chw.max / chw.min;

        c.id = "c";
        c.height = chw.h;
        c.width = chw.w;
        // c.style.aspectRatio = "9/16";
        return c;
    }

    runOnresize() {
        this.#htmlBody();
        this.#resize();
        this.#drawRect();
    }

    #htmlBody() {
        const { html, body } = this;
        html.style.height = `${window.innerHeight}px`;
        html.style.width = `${window.innerWidth}px`;
        // html.style.backgroundColor = "rgba(255,0,0,.6)";

        body.style.height = `${window.innerHeight}px`;
        body.style.width = `${window.innerWidth}px`;
        // body.style.backgroundColor = "rgba(0,0,255,.6)";
    }

    #resize() {
        const { innerHeight: wHeight, innerWidth: wWidth } = window;
        const { canvas } = this;
        canvas.height = this.defaultCanvasHeight;
        canvas.width = this.defaultCanvasWidth;
        // this.#setPosition(canvas);

        const windowSize = {
            h: wHeight,
            w: wWidth,
            min: Math.min(wHeight, wWidth),
            max: Math.max(wHeight, wWidth),
        };
        const canvasSize = {
            h: canvas.height,
            w: canvas.width,
            min: Math.min(canvas.height, canvas.width),
            max: Math.max(canvas.height, canvas.width),
        };

        const scaleByWidth = () => {
            this.scale = windowSize.w / canvasSize.w;
        };
        const scaleByHeight = () => {
            this.scale = windowSize.h / canvasSize.h;
        };

        const canvasRatio = canvasSize.w / canvasSize.h;
        const windowRatio = windowSize.w / windowSize.h;

        if (windowRatio <= canvasRatio) {
            scaleByWidth();
        } else {
            scaleByHeight();
        }

        canvas.style.scale = this.scale;
    }

    #setPosition() {
        const { canvas } = this;
        // canvas.style.position = "absolute";
        // canvas.style.top = "50%";
        // canvas.style.left = "50%";
        // canvas.style.transform = `translate(-50%, -50%)`;
    }

    #drawRect() {
        const num = 10 * (1 + this.scale);
        const { ctx } = this;
        const { height, width } = ctx.canvas;
        const center = {
            x: width * 0.5,
            y: height * 0.5,
        };
        ctx.translate = 0;
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.rect(num, num, width - num * 2, height - num * 2);
        ctx.stroke();
        return;
        ctx.fillStyle = "rgba(0, 225, 255, 1)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "bold 90px Arial";
        ctx.fillText(`n:${num},W:${width},H:${height}`, center.x, center.y);
        ctx.fillText(`wH:${window.innerHeight}`, center.x, center.y + 100);
        ctx.fillText(`wW:${window.innerWidth}`, center.x, center.y + 200);
        ctx.fillText(`scale:${this.scale}`, center.x, center.y + 300);
    }

    debug() {
        const pre = document.createElement("pre");
        pre.id = "pre";
        pre.innerHTML = `canvasRatio:${canvasRatio}
windowRatio:${windowRatio}`;
    }
}

const m = new Main();
const ctx = m.ctx;
const c = m.canvas;

// window.onload = () => {
// };
