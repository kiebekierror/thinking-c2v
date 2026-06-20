export class UiComponent {
    constructor({
        x = 0,
        y = 0,
        width = 100,
        height = 150,
        visible = true,
        backgroundColor = "rgba(255,255,255,1)",
        borderColor = "rgba(0,0,0,1)",
        color = "rgba(0,0,0,1)",
        textAlign = "center",
        textBaseline = "middle",
    } = {}) {
        this.x = x; // Relative X to parent
        this.y = y; // Relative Y to parent
        this.width = width;
        this.height = height;
        this.visible = visible;
        this.backgroundColor = backgroundColor;
        this.borderColor = borderColor;
        this.color = color;
        this.textAlign = textAlign;
        this.textBaseline = textBaseline;
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
        if (!this.visible || (this.parent && !this.parent.visible))
            return false;
        const ax = this.absoluteX;
        const ay = this.absoluteY;
        return (
            mx >= ax &&
            mx <= ax + this.width &&
            my >= ay &&
            my <= ay + this.height
        );
    }
}
