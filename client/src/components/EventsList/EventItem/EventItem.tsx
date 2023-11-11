import {IEventItem} from "@/types";
import moment from "moment";
import {Modal} from "flowbite-react";
import {useState} from "react";
import {useLazyGetEventByIdQuery} from "@/store/services/eventsApi.ts";

const EventItem = (props: IEventItem) => {
    const date = moment(props.datetime).format('YYYY-MM-DD HH:mm:ss').split(" ")
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [trigger, {data}] = useLazyGetEventByIdQuery()
    return (
        <>
            <div className="flex flex-row justify-between border p-2">
                <div className="flex gap-2 ">
                    <img className="max-h-20" src={`https://rs1.k-lab.su/assets/${props.image_str}`} alt="here img"/>
                    <p className="text-xl font-semibold">Двор 1</p>
                </div>
                <div className="flex flex-col items-end">
                    <p>{date[0]}</p>
                    <p>{date[1]}</p>
                    <button
                        className="px-6 rounded-md transition duration-300 py-1.5 text-white bg-primary-dark
                        hover:bg-primary-light
                        active:bg-primary-dark
                        outline-white"
                        onClick={() => {
                            trigger(props._id)
                            setIsOpen(true)
                        }}
                    >
                        Рассмотреть
                    </button>
                </div>
            </div>
            {data &&
                <Modal  dismissible show={isOpen} onClose={() => setIsOpen(false)}>
                    <Modal.Header>
                        Двор 1
                    </Modal.Header>
                    <Modal.Body className="flex flex-col gap-10">
                        <div className="h-80 w-full bg-gray-400 flex justify-center items-center">
                            <img src={`http://localhost:3000/assets/${data.image_str}`} alt=""/>
                        </div>
                        <p className="text-2xl text-center">
                            {data.weapon
                                ? "Обнаружен человек с оружием!"
                                : data.weapon_pose
                                    ? "Обнаружен человек в позе стрелка!"
                                    : "Обнаружено что-то"
                            }
                        </p>
                        <div className="flex flex-row justify-center gap-10">
                            <button
                                className="px-6 rounded-md transition duration-300 py-1.5 text-white
                            bg-red-700
                            hover:bg-red-600
                            active:bg-red-500
                            outline-white"
                            >
                                Подтвердить и вызвать ЧОП
                            </button>
                            <button
                                className="px-6 rounded-md transition duration-300 py-1.5
                            text-black dark:text-white
                            bg-transparent hover:bg-gray-200 dark:hover:bg-gray-600
                            border
                            border-black dark:border-white
                            outline-white"
                            >Отклонить
                            </button>
                        </div>
                    </Modal.Body>
                </Modal>
            }
        </>
    );
};

export default EventItem;
