class Main {
    /**
     * 負責創建 `document.createElement("canvas")` 並 append 到 body.
     *
     * 控制 canvas 的基礎的 size, scale.
     */
    constructor() {
        const canvas = document.createElement("canvas");
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;

        this.defaultCanvasHeight = 1920;
        this.defaultCanvasWidth = 1080;

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }

    #size(canvas) {
        canvas;
    }
}
