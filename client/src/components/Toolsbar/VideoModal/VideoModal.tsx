import {Button, FileInput, Modal} from "flowbite-react";
import {FormEvent} from "react";
import {useUploadFileMutation} from "@/store/services/videoApi.ts";

const VideoModal = ({isOpen, setIsOpen}: { isOpen: boolean, setIsOpen: (b: boolean) => void }) => {
    const [mutate] = useUploadFileMutation()
    const handleFileChange = (event: FormEvent) => {
        event.preventDefault()
        const formData = new FormData(event.target);
        console.log(formData.get("file"))
        uploadFile(formData)
    };
    const handleOpenModal = () => {
        setIsOpen(!isOpen)
    }

    const uploadFile = (data: FormData) => {
        mutate(data)
    };
    return (
        <Modal dismissible show={isOpen} onClose={handleOpenModal}>
            <Modal.Header>Загрузка видео</Modal.Header>
            <Modal.Body>
                <form
                    onSubmit={handleFileChange}
                    className="py-4 flex flex-col gap-8"
                >
                    <FileInput accept="video/mp4, video/mkv" name="file" multiple={true}/>
                    <Button className="max-w-2xl" type="submit">Загрузить</Button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default VideoModal;