// /storage/emulated/0/1/gitroot/thinking/c2v/shared/ui/button.js

// Base UI Component supporting Parent-Child hierarchy
export class UiComponent {
    constructor({ x = 0, y = 0, width = 0, height = 0, visible = true } = {}) {
        this.x = x;          // Relative X to parent
        this.y = y;          // Relative Y to parent
        this.width = width;
        this.height = height;
        this.visible = visible;
        this.parent = null;
        this.children = [];
    }

    // Recursively calculate absolute X coordinate on Canvas
    get absoluteX() {
        return this.x + (this.parent ? this.parent.absoluteX : 0);
    }

    // Recursively calculate absolute Y coordinate on Canvas
    get absoluteY() {
        return this.y + (this.parent ? this.parent.absoluteY : 0);
    }

    addChild(child) {
        child.parent = this;
        this.children.push(child);
    }

    // Hit-detection using absolute coordinates
    isHit(mx, my) {
        if (!this.visible || (this.parent && !this.parent.visible)) return false;
        const ax = this.absoluteX;
        const ay = this.absoluteY;
        return mx >= ax && mx <= ax + this.width && my >= ay && my <= ay + this.height;
    }
}

// Button component extending UiComponent
export class Button extends UiComponent {
    constructor({ x, y, width, height, text, onClick }) {
        super({ x, y, width, height });
        this.text = text;
        this.onClick = onClick;
    }

    draw(ctx) {
        if (!this.visible) return;

        const ax = this.absoluteX;
        const ay = this.absoluteY;

        // 按鈕主體
        ctx.fillStyle = "rgba(40, 40, 40, 0.9)";
        ctx.strokeStyle = "rgba(0, 225, 255, 1)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(ax, ay, this.width, this.height, 8);
        ctx.fill();
        ctx.stroke();
        
        // 按鈕文字
        ctx.fillStyle = "rgba(0, 225, 255, 1)";
        ctx.font = "bold 28px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.text, ax + this.width / 2, ay + this.height / 2);
    }
}

