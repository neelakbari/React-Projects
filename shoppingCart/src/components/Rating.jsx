import {AiFillStar, AiOutlineStar} from 'react-icons/ai'
const Rating = ({rating,onClick,style}) => {
    return (
        <>
    {[...Array(5)].map((_,i)=>{
        return <span onClick={()=>onClick(i)} key={i} style={style}>
            {rating>=i?(<AiFillStar fontSize="15px"/>):(<AiOutlineStar fontSize="15px"/>)}
        </span>
    })}
    </>
  )
}

export default Rating