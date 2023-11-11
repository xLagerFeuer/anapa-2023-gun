import {Button, Modal, TextInput} from "flowbite-react";
import {FormEvent, useState} from "react";
import {useSendRtspLinksMutation} from "@/store/services/streamApi.ts";

const StreamModal = ({isOpen, setIsOpen}: { isOpen: boolean, setIsOpen: (b: boolean) => void }) => {
    const [inputValues, setInputValues] = useState({
        input1: "",
        input2: "",
        input3: "",
    });
    const [mutate] = useSendRtspLinksMutation()

    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget;
        setInputValues({
            ...inputValues,
            [name]: value,
        });
    };
    const handleOpenModal = () => {
        setIsOpen(!isOpen)
    }
    const handleForm = (e: FormEvent) => {
        e.preventDefault()
        mutate(Object.values(inputValues))
    }
    return (
        <Modal dismissible show={isOpen} onClose={handleOpenModal}>
            <Modal.Header className="dark:text-white dark:bg-bg-primary">Загрузка rtsp ссылок</Modal.Header>
            <Modal.Body className="dark:bg-bg-primary">
                <form onSubmit={handleForm} className="flex flex-col gap-4">
                    <TextInput

                        type="text"
                        name="input1"
                        value={inputValues.input1}
                        onChange={handleChange}
                        placeholder="rtsp://"
                    />
                    <TextInput

                        type="text"
                        name="input2"
                        value={inputValues.input2}
                        onChange={handleChange}
                        placeholder="rtsp://"
                    />
                    <TextInput

                        type="text"
                        name="input3"
                        value={inputValues.input3}
                        onChange={handleChange}
                        placeholder="rtsp://"
                    />
                    <button
                        type="submit"
                        className="px-10 rounded-md transition duration-300 py-1.5 text-white bg-primary-dark
                hover:bg-primary-light
                active:bg-primary-dark
                outline-white">
                        Отправить
                    </button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default StreamModal;