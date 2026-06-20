import { Canvas } from "./canvas.js";
import { CodeRain } from "../../shared/animations/codeRain/codeRain.js";
import { CanvasUi } from "../../shared/ui/canvasUi.js";
import { FbfRecorder } from "../../shared/utils/fbfRecorder.js";

export class Main {
    constructor() {
        // to ai: don't change this structure
        window.onload = () => {
            this.bootstrap();
        };
    }

    bootstrap() {
        const canvasInstance = new Canvas();
        const recorder = new FbfRecorder(canvasInstance.canvas);
        const animation = new CodeRain(canvasInstance);
        const ui = new CanvasUi(canvasInstance, {
            onStartAnimation: () => {
                animation.start();
                console.log(animation);
                console.log("onStartAnimation");
            },
            onToggleRecord: (updateUiState) => {
                if (!recorder.isRecording) {
                    recorder.start();
                    updateUiState(true);
                } else {
                    recorder.stop();
                    updateUiState(false);
                }
            },
        });

        this.setCanvas(canvasInstance);

        canvasInstance.ui = ui;
        canvasInstance.recorder = recorder;

        canvasInstance.escButton.onclick = () => {
            ui.toggle();
            ui.draw();
        };

        animation.start();
    }

    setCanvas(canvas) {
        this.canvas = canvas;
    }
}

export const main = new Main();
