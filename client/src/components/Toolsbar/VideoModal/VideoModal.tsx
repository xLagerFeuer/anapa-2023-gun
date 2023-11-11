import { Button, FileInput, Modal, Spinner } from "flowbite-react";
import { FormEvent, useEffect, useState } from "react";
import { useUploadFileMutation } from "@/store/services/videoApi.ts";

const VideoModal = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (b: boolean) => void }) => {


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