import { useNavigate } from 'react-router-dom'

function Goback() {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(-1)
  }
  return (
    <>
      <button onClick={handleClick}>Tro lai</button>
    </>
  )
}

export default Goback
