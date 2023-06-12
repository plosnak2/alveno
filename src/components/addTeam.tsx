import { FC, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import ModalAddTeam from './modalAddTeam';

interface IProps {
}

export const AddTeam: FC<IProps> = ({}) => {
    const [showModalAddTeam, setShowModalAddTeam] = useState(false);

    const handleClose = () => setShowModalAddTeam(false);
    const handleShow = () => setShowModalAddTeam(true);
  
  
    return (
        <>
            <ModalAddTeam show={showModalAddTeam} handleClose={handleClose}/>
            <div className='add-team-button' onClick={handleShow}>
                <AiOutlinePlus size={50} color='black'/>
            </div>
        </>
    );
}

export default AddTeam;