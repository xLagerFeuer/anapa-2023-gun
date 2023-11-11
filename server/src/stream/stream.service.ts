import { Injectable } from '@nestjs/common';
import { StreamDto } from './stream.dto';
import * as Stream from 'node-rtsp-stream';
import * as net from 'net';

@Injectable()
export class StreamService {
    private async findAvailablePort(startingPort: number, maxAttempts: number): Promise<number | null> {
        let currentPort = startingPort;

        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            if (await this.isPortAvailable(currentPort)) {
                return currentPort;
            }
            currentPort++;
        }
        return null; // если не удалось найти доступный порт
    }

    private async isPortAvailable(port: number): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            const tester = net.createServer()
                .once('error', () => resolve(false))
                .once('listening', () => tester.once('close', () => resolve(true)).close())
                .listen(port);
        });
    }

    async setNewStreams(body: StreamDto): Promise<number | null> {
        const startingPort = 3001;
        const maxAttempts = 100; // или любое другое разумное максимальное количество попыток

        const availablePort = await this.findAvailablePort(startingPort, maxAttempts);

        if (availablePort === null) {
            console.error('Could not find an available port.');
            return null;
        }

        const optionsFirst = {
            name: 'first',
            streamUrl: body.firstUrl,
            wsPort: availablePort,
            ffmpegOptions: {
                '-stats': '',
                '-r': 30,
                '-rtsp_transport': 'tcp',
            },
        };

        const myStreamFirst = new Stream(optionsFirst);

        myStreamFirst.on('data', (data) => {
            // Handle data if needed
            console.log('Received data:', data);
        });
        myStreamFirst.on("disconnect", (some) => {
            console.log(some)
            console.log("disconnect")
            myStreamFirst.stop(); // Останавливает стрим
        })

        return availablePort;
    }
}
