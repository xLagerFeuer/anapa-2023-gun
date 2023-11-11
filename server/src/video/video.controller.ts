import {Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
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
    async sendFile(@UploadedFile() file: Express.Multer.File) {
        return await this.videoService.cutVideo(file)
    }
}
