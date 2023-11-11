import {Injectable, UploadedFile} from '@nestjs/common';
import * as fs from 'fs';
import * as child_process from 'child_process';
import {Gateway} from "../gateway/gateway";
import * as http from "http";

@Injectable()
export class VideoService {
    constructor(private readonly gateWay: Gateway) {
    }

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
        child_process.exec(ffmpegCommand, async (error, stdout, stderr) => {
            if (error) {
                console.error('Error extracting frames:', error);
            } else {
                return await this.convertFramesToBase64();
            }
        });
    }

    // Отправление фреймов через REST POST
    // async convertFramesToBase64() {
    //     try {
    //         const frameFiles = fs.readdirSync('./uploads');
    //         for (const frameFile of frameFiles) {
    //             const framePath = `./uploads/${frameFile}`;
    //             const frameBuffer = fs.readFileSync(framePath);
    //             const base64Frame = frameBuffer.toString('base64');
    //
    //             // Отправляем каждый фрейм по REST API POST-запросу
    //             await this.sendFrameToAPI(base64Frame);
    //
    //             // Пауза между отправкой фреймов (10 миллисекунд)
    //             await new Promise(resolve => setTimeout(resolve, 10));
    //         }
    //         return { success: true };
    //     } catch (e) {
    //         return { error: e };
    //     } finally {
    //         // Удаление видео и кадров после завершения отправки
    //         this.deleteVideoAndFrames();
    //     }
    // }
    //
    // async sendFrameToAPI(base64Frame: string) {
    //     const postData = JSON.stringify({ base64Frame });
    //
    //     const options: http.RequestOptions = {
    //         hostname: 'your-api-hostname.com', // Замените на реальный адрес вашего REST API
    //         port: 80, // Замените на реальный порт вашего REST API
    //         path: '/api/endpoint', // Замените на реальный путь вашего REST API
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Content-Length': postData.length,
    //         },
    //     };
    //
    //     return new Promise<void>((resolve, reject) => {
    //         const req = http.request(options, (res) => {
    //             if (res.statusCode === 200) {
    //                 resolve();
    //             } else {
    //                 reject(new Error(`Failed to send frame. Status code: ${res.statusCode}`));
    //             }
    //         });
    //
    //         req.on('error', (err) => {
    //             reject(err);
    //         });
    //
    //         req.write(postData);
    //         req.end();
    //     });
    // }
    //

    async convertFramesToBase64() {

        try {
            const frameFiles = fs.readdirSync('./uploads');
            const base64Frames = [];
            for (const frameFile of frameFiles) {
                const framePath = `./uploads/${frameFile}`;
                const frameBuffer = fs.readFileSync(framePath);
                const base64Frame = frameBuffer.toString('base64');
                this.gateWay.server.emit("test", base64Frame);
                // base64Frames.push(base64Frame);
            }
            return {success: true}
        } catch (e) {
            return {error: e}
        }
        // Отправляем base64Frames через WebSocket
        // this.gateWay.server.emit("test", base64Frames);
        // Удаление видео и кадров
        // this.deleteVideoAndFrames();
    }

    deleteVideoAndFrames() {
        const videoPath = './uploads';
        fs.rmdirSync(videoPath, {recursive: true});

        console.log('Video and frames deleted');
    }
}
