import {Modal, TextInput} from "flowbite-react";
import {FormEvent, useEffect, useState} from "react";
import {useSendRtspLinksMutation} from "@/store/services/streamApi.ts";
import {useAppDispatch} from "@/store";
import {setPort, setStreams, setSuccess} from "@/store/features/streamSlice.ts";

const StreamModal = ({isOpen, setIsOpen}: { isOpen: boolean, setIsOpen: (b: boolean) => void }) => {
    const [inputValues, setInputValues] = useState({
        firstUrl: "",
        // secondUrl: "",
        // thirdUrl: "",
    });
    const [mutate, {data}] = useSendRtspLinksMutation()
    const dispatch = useAppDispatch()
    const handleChange = (e: FormEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget;
        setInputValues({
            ...inputValues,
            [name]: value,
        });
    };
    useEffect(() => {
        if (data) {
            dispatch(setPort({port: data}))
        }
    }, [data])
    const handleOpenModal = () => {
        setIsOpen(!isOpen)
    }
    const handleForm = (e: FormEvent) => {
        e.preventDefault()
        mutate(inputValues)
        dispatch(setStreams(inputValues))
        setInterval(() => {
            dispatch(setSuccess())
        }, 2000)
    }
    return (
        <Modal dismissible show={isOpen} onClose={handleOpenModal}>
            <Modal.Header className="dark:text-white dark:bg-bg-primary">Загрузка rtsp ссылок</Modal.Header>
            <Modal.Body className="dark:bg-bg-primary">
                <form onSubmit={handleForm} className="flex flex-col gap-4">
                    <TextInput

                        type="text"
                        name="firstUrl"
                        value={inputValues.firstUrl}
                        onChange={handleChange}
                        placeholder="rtsp://"
                    />
                    {/*<TextInput*/}
                    {/*    type="text"*/}
                    {/*    name="secondUrl"*/}
                    {/*    value={inputValues.secondUrl}*/}
                    {/*    onChange={handleChange}*/}
                    {/*    placeholder="rtsp://"*/}
                    {/*/>*/}
                    {/*<TextInput*/}

                    {/*    type="text"*/}
                    {/*    name="thirdUrl"*/}
                    {/*    value={inputValues.thirdUrl}*/}
                    {/*    onChange={handleChange}*/}
                    {/*    placeholder="rtsp://"*/}
                    {/*/>*/}
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