import { Injectable, UploadedFile } from '@nestjs/common';
import * as fs from 'fs';
import * as child_process from 'child_process';
import { Gateway } from "../gateway/gateway";

@Injectable()
export class VideoService {
    constructor(private readonly gateWay: Gateway) {}

    async cutVideo(@UploadedFile() file: Express.Multer.File) {
        // Проверяем, что файл - видео
        if (!file.mimetype.startsWith('video/')) {
            throw new Error('Invalid file format');
        }

        // Создайте и настройте папку "uploads" (если ее нет)
        const uploadDir = 'uploads';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        // Путь к сохраненному видео
        const videoPath = `./uploads/${file.filename}`;

        // Сначала сохраните видео
        fs.renameSync(file.path, videoPath);

        // Далее, используйте ffmpeg для разбиения видео на кадры
        const outputPath = `./uploads/frame-%d.jpg`;
        const ffmpegCommand = `ffmpeg -i ${videoPath} -vf "fps=30" ${outputPath}`;
        child_process.exec(ffmpegCommand, (error, stdout, stderr) => {
            if (error) {
                console.error('Error extracting frames:', error);
            } else {
                console.log('Video frames extracted and saved in "uploads" folder');
                this.convertFramesToBase64();
            }
        });
    }

    convertFramesToBase64() {
        const frameFiles = fs.readdirSync('./uploads');
        const base64Frames = [];

        for (const frameFile of frameFiles) {
            const framePath = `./uploads/${frameFile}`;
            const frameBuffer = fs.readFileSync(framePath);
            const base64Frame = frameBuffer.toString('base64');
            base64Frames.push(base64Frame);
        }

        // Отправляем base64Frames через WebSocket
        this.gateWay.server.emit("test", base64Frames);

        // Удаление видео и кадров
        this.deleteVideoAndFrames();
    }

    deleteVideoAndFrames() {
        const videoPath = './uploads';
        fs.rmdirSync(videoPath, { recursive: true });

        console.log('Video and frames deleted');
    }
}
