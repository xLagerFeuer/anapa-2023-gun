import {useState} from "react";
import {Button, Modal} from "flowbite-react";
import Select from "react-select";

function App() {
    const [selectedOption] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const handleChange = (value) => {
        console.log(value)
    }
    const options = [
        {value: 'chocolate', label: 'Chocolate'},
        {value: 'strawberry', label: 'Strawberry'},
        {value: 'vanilla', label: 'Vanilla'},
    ];
    return (
        <div className="">
            <Button onClick={() => setOpenModal(true)}>Toggle modal</Button>
            <Select options={options} placeholder="Выберите" defaultValue={selectedOption} onChange={handleChange}/>
            <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                <Modal.Header>Terms of Service</Modal.Header>
                <Modal.Body>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setOpenModal(false)}>I accept</Button>
                    <Button color="gray" onClick={() => setOpenModal(false)}>
                        Decline
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default App;
