import { Button, FileInput, Modal, Spinner } from "flowbite-react";
import { FormEvent, useEffect, useState } from "react";
import { useUploadFileMutation } from "@/store/services/videoApi.ts";

const VideoModal = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (b: boolean) => void }) => {
    const [mutate, { data }] = useUploadFileMutation();
    const [video, setVideo] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showForm, setShowForm] = useState(true);

    useEffect(() => {
        if (isLoading) {
            setTimeout(() => {
                setIsSuccess(true);
            }, 3000);
        }
    }, [isLoading]);

    const handleFileChange = (event: FormEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        setVideo(formData.get("file"));
        uploadFile(formData);
    };

    const handleOpenModal = () => {
        setIsOpen(!isOpen);
        // Reset the state when the modal is opened
        setVideo(null);
        setIsSuccess(false);
        setIsLoading(false);
        setShowForm(true);
    };

    const uploadFile = (data: FormData) => {
        mutate(data);
        setIsLoading(true);
        setShowForm(false); // Hide the form while loading
    };

    const handleVideoEnd = () => {
        // Callback when the video ends
        setIsSuccess(false);
        setIsLoading(false); // Reset loading state
        setShowForm(true); // Show the form again
    };

    return (
        <Modal dismissible show={isOpen} onClose={handleOpenModal}>
            <Modal.Header>Загрузка видео</Modal.Header>
            <Modal.Body>
                {isSuccess && (
                    <div className="bg-gray-400 w-full h-80" onClick={handleVideoEnd}>
                        <video autoPlay={true} src={URL.createObjectURL(video)} onEnded={handleVideoEnd}></video>
                    </div>
                )}
                {isLoading && !isSuccess && (
                    <div className="bg-gray-400 w-full h-80 flex justify-center items-center">
                        <Spinner />
                    </div>
                )}
                {!isLoading && showForm && (
                    <form onSubmit={handleFileChange} className="py-4 flex flex-col gap-8">
                        <FileInput accept="video/mp4, video/mkv" name="file" multiple={true} />
                        <Button className="max-w-2xl" type="submit">
                            Загрузить
                        </Button>
                    </form>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default VideoModal;