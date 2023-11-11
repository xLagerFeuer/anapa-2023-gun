import {Injectable} from '@nestjs/common';
import {StreamDto} from "./stream.dto";
import * as Stream from "node-rtsp-stream"

@Injectable()
export class StreamService {
    async setNewStreams(body: StreamDto) {
        console.log(body)
        const optionsFirst = {
            name: 'first',
            streamUrl: body.firstUrl,
            wsPort: 3001,
            ffmpegOptions: {
                '-stats': '',
                '-r': 30,
                '-rtsp_transport': 'tcp'  // Добавьте эту опцию
            }
        };
        // Поскольку потоковое вещание сильно грузит бек было решено пока что остановится на 1 стриме
        // const optionsSecond = {
        //     name: 'second',
        //     streamUrl: body.secondUrl,
        //     wsPort: 3002,
        //     ffmpegOptions: {
        //         '-stats': '',
        //         '-r': 30
        //     }
        // };
        // const optionsThird = {
        //     name: 'third',
        //     streamUrl: body.thirdUrl,
        //     wsPort: 3003,
        //     ffmpegOptions: {
        //         '-stats': '',
        //         '-r': 30
        //     }
        // };

        const myStreamFirst = new Stream(optionsFirst);
        // const myStreamSecond = new Stream(optionsSecond);
        // const myStreamThird = new Stream(optionsThird);

        myStreamFirst.on('data', (data) => {
            // Handle data if needed
            console.log('Received data:', data);
        });
        // myStreamSecond.on('data', (data) => {
        //     // Handle data if needed
        //     console.log('Received data:', data);
        // });
        // myStreamThird.on('data', (data) => {
        //     // Handle data if needed
        //     console.log('Received data:', data);
        // });
    }
}
