import {Controller, Get, Param, Res} from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import {Response} from 'express';

@Controller('file')
export class FileController {
    @Get()
    getImage(@Param() param: string, @Res() res: Response): any {
        // const imagePath = path.join(__dirname, '../assets/', imageName);
        console.log(__dirname, param)
        // Проверка существования файла
        // if (!fs.existsSync(imagePath)) {
        //     return res.status(404).send('Image not found');
        // }
        //
        // res.sendFile(imagePath);
    }
}
