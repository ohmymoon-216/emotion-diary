import {useNavigate, useParams} from "react-router-dom";
import DiaryEditor from "../components/DiaryEditor";
import {useContext, useEffect, useState} from "react";
import {DiaryStateContext} from "../App";

const Edit = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const diaryList = useContext(DiaryStateContext);
    const [originData, setOriginData] = useState();

    useEffect(() => {
        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerHTML = `감정 일기장 - ${id}번 일기 수정`;
    },[]);

    useEffect(() => {
        if(diaryList.length >= 0){
            const targetDiary = diaryList.find((it)=>parseInt(it.id) === parseInt(id));
            if(targetDiary){
                setOriginData(targetDiary);
            }else{
                navigate('/home', {replace: true});
            }
        }
    }, [id, diaryList]);

    return (
        <div>
            {originData && <DiaryEditor isEdit={true} originData={originData}/>}
        </div>
    );
}

export default Edit;
