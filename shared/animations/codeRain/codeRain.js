export class CodeRain {
    constructor(canvasInstance) {
        this.canvasInstance = canvasInstance;
        this.canvas = canvasInstance.canvas;
        this.ctx = canvasInstance.ctx;
        this.fontSize = 20;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        this.drops = new Array(this.columns).fill(1);
        this.characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";
    }

    start() {
        const animate = () => {
            if (this.isRunning) {
                this.draw();
            }

            if (this.canvasInstance.ui) {
                this.canvasInstance.ui.draw();
            }

            if (this.canvasInstance.recorder) {
                this.canvasInstance.recorder.captureFrame();
            }

            requestAnimationFrame(animate);
        };
    }

    draw() {
        const { height, width } = this.canvas;
        this.ctx.clearRect(0, 0, width, height);
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        this.ctx.fillRect(0, 0, width, height);

        this.ctx.fillStyle = "#0F0";
        this.ctx.font = `${this.fontSize}px monospace`;

        for (let i = 0; i < this.drops.length; i++) {
            const text = this.characters.charAt(
                Math.floor(Math.random() * this.characters.length),
            );
            this.ctx.fillText(
                text,
                i * this.fontSize,
                this.drops[i] * this.fontSize,
            );

            if (
                this.drops[i] * this.fontSize > this.canvas.height &&
                Math.random() > 0.975
            ) {
                this.drops[i] = 0;
            }
            this.drops[i]++;
        }
    }
}
