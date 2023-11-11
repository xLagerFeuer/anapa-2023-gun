import * as dayjs from "dayjs"
const EventLogItem = ({data} : {data: any}) => {
    const date = dayjs(data.datetime).format('YYYY-MM-DD HH:mm:ss').split(" ")
    return (
        <div className="flex flex-row p-2 gap-2">
            <img
                 className="w-24 h-16 border"
                 src={`http://localhost:3000/assets/${data.image_str}`} alt="photo"
            />
            <div className="flex flex-col flex-1">
                <div className="text-white flex justify-between">
                    <p>Двор 1</p>
                    <div className="flex flex-col items-end">
                        <p>{date[0]}</p>
                        <p>{date[1]}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventLogItem;