import { Button } from "./button.js";
import { UiComponent } from "./uiComponent.js";

export class CanvasUi {
    constructor(canvas, config = {}) {
        this.canvas = canvas.canvas;
        this.ctx = canvas.ctx;
        this.visible = false;

        this.root = new UiComponent({
            x: 0,
            y: 0,
            width: this.canvas.width,
            height: this.canvas.height,
        });
        this.config = config;

        this.onStartAnimation = this.config.onStartAnimation || (() => {});
        this.onToggleRecord = this.config.onToggleRecord || (() => {});
        this.init();
    }

    init() {
        const panelWidth = 400;
        const panelHeight = 300;
        this.menuPanel = new UiComponent({
            x: (this.canvas.width - panelWidth) / 2,
            y: (this.canvas.height - panelHeight) / 2,
            width: panelWidth,
            height: panelHeight,
        });
        this.root.addChild(this.menuPanel);

        this.menuPanel.addChild(
            new Button({
                x: 50,
                y: 50,
                width: 300,
                height: 70,
                text: "START ANIMATION",
                onClick: () => {
                    this.visible = false;
                    this.onStartAnimation();
                },
            }),
        );

        this.recButton = new Button({
            x: 50,
            y: 160,
            width: 300,
            height: 70,
            text: "RECORDING",
            onClick: () => {
                this.onToggleRecord((isRecording) => {
                    this.recButton.text = isRecording
                        ? "STOP RECORD"
                        : "RECORDING";
                });
            },
        });
        this.menuPanel.addChild(this.recButton);

        this.canvas.addEventListener("click", (e) => this.handleClick(e));
    }

    toggle() {
        this.visible = !this.visible;
    }

    handleClick(e) {
        if (!this.visible) return;
        const rect = this.canvas.getBoundingClientRect();
        const clickX =
            ((e.clientX - rect.left) / rect.width) * this.canvas.width;
        const clickY =
            ((e.clientY - rect.top) / rect.height) * this.canvas.height;
        this.dispatchClick(this.root, clickX, clickY);
    }

    dispatchClick(component, mx, my) {
        for (const child of component.children) {
            if (child.isHit(mx, my)) {
                if (child.onClick) {
                    child.onClick();
                    return true;
                }
                if (this.dispatchClick(child, mx, my)) return true;
            }
        }
        return false;
    }

    draw() {
        const { width, height } = this.ctx.canvas;
        this.ctx.clearRect(0, 0, width, height);
        if (!this.visible) return;
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawComponent(this.root);
    }

    drawComponent(component) {
        if (component.draw) component.draw(this.ctx);
        for (const child of component.children) {
            this.drawComponent(child);
        }
    }
}
