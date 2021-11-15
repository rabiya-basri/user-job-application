import React,{useState} from 'react'
import '../style.css'

const Pagination = (props) => {
    const { postsPerPage, totalPosts,paginate,currentPage,setCurrentPage } = props
    const [pageNumberLimit] = useState(10)
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(10)
    const [minPageNumberLimit,setMinPageNumberLimit]=useState(0)
    
    const pageNumbers = []
    
    for (let i = 1; i < Math.ceil(totalPosts / postsPerPage); i++){
        pageNumbers.push(i)
    }
    
    
    const handelNextBtn = () => {
        setCurrentPage(currentPage + 1)
        if (currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        }
    }
    const handelPrevBtn = () => {
        setCurrentPage(currentPage - 1)
        if ((currentPage -1)%pageNumberLimit===0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
        }
    }
    let pageIncrement = null
    if (pageNumbers.length > maxPageNumberLimit) {
        pageIncrement=<li onClick={handelNextBtn}>&hellip;</li>
    }
    let pageDecrement = null
    if (pageNumbers.length > maxPageNumberLimit) {
        pageDecrement=<li onClick={handelPrevBtn}>&hellip;</li>
    }

    return (
        <nav>
            <ul className='pageNumber'>
                <li><button onClick={handelPrevBtn}
                    disabled={currentPage===pageNumbers[0]?true:false}
                    >Prev</button></li>
                {pageDecrement}
                
                {pageNumbers.map((number) => {
                    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
                        return ( 
                            <li key={number} onClick={() => {
                                paginate(number)
                            }}
                            className={currentPage === number ? 'active' : null}>
                            { number}
                            </li>
                        )
                    } else {
                        return null
                    }
                    
                })}
                
                { pageIncrement}
                <li><button onClick={handelNextBtn}
                disabled={currentPage===pageNumbers[pageNumbers.length-1]?true:false}
                >Next</button></li>
            </ul>
        </nav>
    )
        
}
export default Pagination