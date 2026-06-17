import { Canvas } from "./canvas.js";
import { CodeRain } from "../../shared/animations/codeRain/codeRain.js";
import { CanvasUi } from "../../shared/ui/canvasUi.js";
import { FbfRecorder } from "../../shared/utils/fbfRecorder.js";

export class Main {
    bootstrap() {
        window.onload = () => {
            const canvasInstance = new Canvas();
            // 1. 初始化獨立的錄製工具
            const recorder = new FbfRecorder(canvasInstance.canvas);

            // 2. 初始化動畫（讓動畫自己去持有錄製器或信號，決定何時開跑）
            const animation = new CodeRain(canvasInstance);
            
            // 3. 初始化 UI，並透過 config 注入業務邏輯信號
            const ui = new CanvasUi(canvasInstance, {
                onStartAnimation: () => {
                    animation.triggerStart(); // 通知動畫重置或啟動渲染
                },
                onToggleRecord: (updateUiState) => {
                    if (!recorder.isRecording) {
                        recorder.start();
                        updateUiState(true);  // 通知 UI 更新為停止錄製狀態
                    } else {
                        recorder.stop();
                        updateUiState(false); // 通知 UI 更新為常態錄製狀態
                    }
                }
            });

            canvasInstance.ui = ui;
            canvasInstance.recorder = recorder; // 掛載以便主循環提取

            // 實體 HTML 按鈕行為切換選單
            canvasInstance.escButton.onclick = () => {
                ui.toggle();
            };

            animation.start();
        };
    }
}
const main = new Main();
main.bootstrap();

