import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {DiaryStateContext} from "../App";
import {getStringDate} from "../util/date";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import {emotionList} from "../util/emotion";

const Diary = () => {

    const navigate = useNavigate();
    const {id} = useParams();
    const diaryList = useContext(DiaryStateContext);
    const [data, setData] = useState();

    useEffect(()=>{
        if(diaryList.length > 0) {
            const targetDiary = diaryList.find(
                (it) => parseInt(it.id) === parseInt(id)
            );
            if(targetDiary){
                setData(targetDiary);
            }else{
                alert('없는 일기입니다.');
                navigate('/home', {replace: true});
            }
        }
    }, [id, diaryList]);

    if (!data) {
        return <div className={"diaryPage"}>로딩중입니다...</div>
    } else {
        const curEmotionData = emotionList.find((it) =>
            parseInt(it.emotion_id) === parseInt(data.emotion)
        );
        return (
            <div className={"DiaryPage"}>
                <MyHeader
                    headText={`${getStringDate(new Date(data.date))}의 기록`}
                    leftChild={<MyButton text={"< 뒤로가기"} onClick={()=>navigate(-1)} />}
                    rightChild={<MyButton text={"수정하기"}
                                          onClick={() => navigate(`/edit/${id}`)} />}
                />
                <article>
                    <section>
                        <h4>오늘의 감정</h4>
                        <div className={"diary_img_wrapper"}>
                            <img src={curEmotionData.emotion_img} />
                            <div className={"emotion_descript"}>
                                {curEmotionData.emotion_descript}
                            </div>
                        </div>
                    </section>
                </article>
            </div>
        );
    }

}

export default Diary;
