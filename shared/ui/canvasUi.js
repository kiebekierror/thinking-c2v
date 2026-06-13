import { Button } from "./button.js";
import { UiComponent } from "./uiComponent.js";

export class CanvasUi {
    constructor(canvasInstance, config = {}) {
        this.canvas = canvasInstance.canvas;
        this.ctx = canvasInstance.ctx;
        this.visible = false;

        this.root = new UiComponent({
            x: 0,
            y: 0,
            width: this.canvas.width,
            height: this.canvas.height,
        });

        // 外部傳入的信號回呼函式 (Callbacks)
        this.onStartAnimation = config.onStartAnimation || (() => {});
        this.onToggleRecord = config.onToggleRecord || (() => {});

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

        // 按鈕 1：發出開始動畫訊號
        this.menuPanel.addChild(
            new Button({
                x: 50,
                y: 50,
                width: 300,
                height: 70,
                text: "START ANIMATION",
                onClick: () => {
                    this.visible = false;
                    this.onStartAnimation(); // 發出訊號
                },
            }),
        );

        // 按鈕 2：發出錄製狀態切換訊號
        this.recButton = new Button({
            x: 50,
            y: 160,
            width: 300,
            height: 70,
            text: "RECORDING",
            onClick: () => {
                this.onToggleRecord((isRecording) => {
                    // 提供一個反向更新按鈕文字的機制
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
