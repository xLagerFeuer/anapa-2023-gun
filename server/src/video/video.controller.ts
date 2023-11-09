import {Body, Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {Gateway} from "../gateway/gateway";
import {VideoService} from "./video.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import * as path from "path";

@Controller('video')
export class VideoController {
    constructor(
        private readonly videoService: VideoService,
    ) {
    }

    @Post("upload")
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads', // Путь к папке, где будут сохранены файлы
            filename: (req, file, callback) => {
                const filename = path.parse(file.originalname).name;
                const extension = path.parse(file.originalname).ext;
                callback(null, `${filename}-${Date.now()}${extension}`);
            },
        }),
    }))
    sendFile(@UploadedFile() file: Express.Multer.File) {
        this.videoService.cutVideo(file)
    }
}
