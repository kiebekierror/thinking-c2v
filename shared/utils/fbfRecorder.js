export class FbfRecorder {
    constructor(canvas) {
        this.canvas = canvas;
        this.isRecording = false;
        this.mediaRecorder = null;
        this.recordedChunks = [];
    }

    start() {
        this.recordedChunks = [];
        const stream = this.canvas.captureStream(0); // 0 幀率代表完全手動控制
        this.mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm;codecs=vp9" });

        this.mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) this.recordedChunks.push(e.data);
        };

        this.mediaRecorder.onstop = () => {
            const blob = new Blob(this.recordedChunks, { type: "video/webm" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `c2v-${Date.now()}.webm`;
            a.click();
            URL.revokeObjectURL(url);
        };

        this.mediaRecorder.start();
        this.isRecording = true;
    }

    stop() {
        if (!this.isRecording) return;
        this.mediaRecorder.stop();
        this.isRecording = false;
    }

    captureFrame() {
        if (!this.isRecording) return;
        const track = this.canvas.captureStream().getVideoTracks()[0];
        if (track && track.requestFrame) {
            track.requestFrame(); // 捕捉當前 Canvas 畫面
        }
    }
}

