export class Canvas {
    /**
     * 負責創建 `document.createElement("canvas")` 並 append 到 body.
     *
     * 控制 canvas 的基礎的 size, scale.
     */
    constructor({
        foo = window,
        defaultCanvasHeight = 1920,
        defaultCanvasWidth = 1080,
        parentElement = document.querySelector("body") || document.body,
        ctxType = "2d",
    } = {}) {
        this.scale = 1;
        this.defaultCanvasHeight = defaultCanvasHeight;
        this.defaultCanvasWidth = defaultCanvasWidth;
        this.parentElement = parentElement;
        this.html = document.querySelector("html");
        this.canvas = this.#createCanvas();
        this.ctx = this.canvas.getContext(ctxType);
        this.parentElement.prepend(this.canvas);

        this.escButton = this.#escButton();
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
        c.style.backgroundColor = "rgba(0,0,0,.4)";
        // c.style.aspectRatio = "9/16";
        return c;
    }

    runOnresize() {
        this.#resize();
        this.#htmlBody();

        this.#drawRect();
    }

    #htmlBody() {
        const { html, parentElement: pe } = this;
        html.style.height = `${window.innerHeight}px`;
        html.style.width = `${window.innerWidth}px`;
        // html.style.backgroundColor = "rgba(255,0,0,.6)";

        pe.style.height = `${this.defaultCanvasHeight * this.scale}px`;
        pe.style.width = `${this.defaultCanvasWidth * this.scale}px`;
        pe.style.position = "relative";
        pe.style.backgroundColor = "rgba(0,0,255,.1)";
        pe.style.display = "flex";
        pe.style.justifyContent = "center";
        pe.style.alignItems = "center";
    }

    #resize() {
        const { innerHeight: wHeight, innerWidth: wWidth } = window;
        const { canvas } = this;
        canvas.height = this.defaultCanvasHeight;
        canvas.width = this.defaultCanvasWidth;

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

        this.canvasRatio = canvasSize.w / canvasSize.h;
        this.parentElementRatio = windowSize.w / windowSize.h;

        if (this.parentElementRatio <= this.canvasRatio) {
            scaleByWidth();
        } else {
            scaleByHeight();
        }

        canvas.style.scale = this.scale;
    }

    #escButton() {
        /**
         * Todo: button for call up menu in canvas.
         * when button pressed it hidden, menu up.
         * when menu closed, button show again.
         * it hidden for don't block button in menu.
         *
         * it style like ios floating button.
         */

        const size = 32;
        const button = document.createElement("div");
        this.parentElement.prepend(button);
        button.id = "escButton";
        button.style.position = "absolute";
        button.style.height = size + "px";
        button.style.width = size + "px";
        button.style.top = "50%";
        button.style.right = `${0 * size}px`;
        button.style.translate = "transform(-50%,0)";
        button.style.backgroundColor = "rgba(255,0,0,1)";
        button.style.borderRadius = "5px";
        button.style.zIndex = 9999;
        button.onclick = () => {
            alert("from client/js/canvas.js");
            this.runOnresize();
        };
        return button;
    }

    // below code are for debug, not important.
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
        this.debugPre();
    }

    debugPre() {
        const pre = document.createElement("pre");
        pre.id = "pre";
        pre.style.position = "fixed";
        pre.style.top = 0;
        pre.style.left = 0;
        pre.innerHTML = `canvasRatio:${this.canvasRatio}
windowRatio:${this.parentElementRatio}`;
        this.parentElement.prepend(pre);
    }
}
