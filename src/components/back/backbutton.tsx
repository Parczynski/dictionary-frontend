import { useNavigate } from "react-router-dom"

export const BackButton = () => {
    const navigate = useNavigate()
    return (
        <div id="backBtn" onClick={()=>navigate(-1)}>&lt;</div>
    )
}