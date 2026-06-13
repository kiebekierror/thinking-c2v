import { UiComponent } from "./uiComponent";

export class Button extends UiComponent {
    constructor({
        x,
        y,
        width,
        height,
        text = "button",
        onClick = () => {
            alert(this.text);
        },
        backgroundColor = "rgba(40, 40, 40, 0.9)",
        borderColor = "rgba(0, 225, 255, 1)",
        color = "rgba(0, 225, 255, 1)",
        textAlign,
        textBaseline,
    }) {
        super({
            x,
            y,
            width,
            height,
            backgroundColor,
            borderColor,
            color,
            textAlign,
            textBaseline,
        });
        this.text = text;
        this.onClick = onClick;
    }

    draw(ctx) {
        if (!this.visible) return;

        const ax = this.absoluteX;
        const ay = this.absoluteY;

        // 按鈕主體
        ctx.fillStyle = this.backgroundColor;
        ctx.strokeStyle = this.borderColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(ax, ay, this.width, this.height, 8);
        ctx.fill();
        ctx.stroke();

        // 按鈕文字
        ctx.fillStyle = this.color;
        ctx.font = "bold 28px monospace";
        ctx.textAlign = this.textAlign;
        ctx.textBaseline = this.textBaseline;
        ctx.fillText(this.text, ax + this.width / 2, ay + this.height / 2);
    }
}
