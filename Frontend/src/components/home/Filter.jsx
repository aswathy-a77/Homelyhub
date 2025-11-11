import {useState} from 'react'
import FilterModal from './FilterModal'
const Filter = () => {
    const[isModalOpen, setIsModalOpen] = useState(false); // close state of the modal

    const handleShowAllPhotos = () => {
        setIsModalOpen(true);
    }
    const handleCloseModal =() =>{
        setIsModalOpen(false);
    }
  return (
    <>
        <span className='material-symbols-outlined filter'
        onClick={handleShowAllPhotos}>
            tune

    </span>
    {isModalOpen && <FilterModal onClose={handleCloseModal}/>}
    </>
  )
}

export default Filter
