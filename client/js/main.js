export class Main {
    /**
     * 負責創建 `document.createElement("canvas")` 並 append 到 body.
     *
     * 控制 canvas 的基礎的 size, scale.
     */
    constructor() {
        console.clear();

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
        const hw = {
            h: dch,
            w: dcw,
            min: Math.min(dch, dcw),
            max: Math.max(dch, dcw),
        };
        const minDmax = hw.min / hw.max;
        const maxDmin = hw.max / hw.min;

        c.height = hw.h;
        c.width = hw.w;
        c.style.aspectRatio = "9/16";
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

        body.style.height = `${window.innerHeight}px`;
        body.style.width = `${window.innerWidth}px`;
    }

    #resize() {
        const { innerHeight: wHeight, innerWidth: wWidth } = window;
        const { canvas } = this;
        canvas.height = this.defaultCanvasHeight;
        canvas.width = this.defaultCanvasWidth;
        // this.#setPosition(canvas);

        const wSize = {
            h: wHeight,
            w: wWidth,
            min: Math.min(wHeight, wWidth),
            max: Math.max(wHeight, wWidth),
        };
        const cSize = {
            h: canvas.height,
            w: canvas.width,
            min: Math.min(canvas.height, canvas.width),
            max: Math.max(canvas.height, canvas.width),
        };

        const scaleByWidth = () => {
            this.scale = wSize.w / cSize.w;
        };
        const scaleByHeight = () => {
            this.scale = wSize.h / cSize.h;
        };

        const windowHeightLessThenCanvasHeight = wSize.h < cSize.h;
        const windowWidthLessThenCanvasWidth = wSize.w < cSize.w;

        // Todo: scal condition logic
        if (wSize.h < cSize.h) {
            canvas.style.backgroundColor = "rgba(255,0,0,.4)";
            scaleByHeight();
        }

        if (wSize.w < cSize.w) {
            scaleByWidth();
            canvas.style.backgroundColor = "rgba(0,255,0,.4)";
            if (wSize.h < wSize.w) {
                canvas.style.backgroundColor = "rgba(0,0,255,.4)";
                scaleByHeight();
            }
        }

        // this.scale = (wSize.h * cSize.h) / cSize.w;
        canvas.style.scale = this.scale;
    }

    #setPosition() {
        const { canvas } = this;
        canvas.style.position = "absolute";
        canvas.style.top = "50%";
        canvas.style.left = "50%";
        canvas.style.transform = `${canvas.style.transform} translate(-50%, -50%)`;
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

        ctx.fillStyle = "rgba(0, 225, 255, 1)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "bold 90px Arial";
        ctx.fillText(`n:${num},W:${width},H:${height}`, center.x, center.y);
        ctx.fillText(`wH:${window.innerHeight}`, center.x, center.y + 100);
        ctx.fillText(`wW:${window.innerWidth}`, center.x, center.y + 200);
        ctx.fillText(`scale:${this.scale}`, center.x, center.y + 300);
    }
}

const m = new Main();
const ctx = m.ctx;
const c = m.canvas;

// window.onload = () => {
// };
