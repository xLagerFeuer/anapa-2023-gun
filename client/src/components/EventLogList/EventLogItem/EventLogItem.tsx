const EventLogItem = ({imgLink, text} : {imgLink: string, text: string}) => {
    return (
        <div className="flex flex-row p-2 gap-4">
            <img
                 className="w-24 h-16 border"
                 src={imgLink} alt="photo"
            />
            <div className="flex flex-col flex-1">
                <div className="text-red-500 flex justify-between">
                    <p>place</p>
                    <p>time</p>
                </div>
                <p>{text}</p>
            </div>
        </div>
    );
};

export default EventLogItem;