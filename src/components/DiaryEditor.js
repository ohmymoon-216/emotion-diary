import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useRef, useState} from "react";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import EmotionItem from "./EmotionItem";
import {DiaryDispatchContext} from "../App";
import { getStringDate } from "../util/date";
import {emotionList} from "../util/emotion";

const DiaryEditor = ({isEdit, originData}) => {
    const navigate = useNavigate();
    const contentRef = useRef();


    const [emotion, setEmotion] = useState(3);
    const [date, setDate] = useState(getStringDate(new Date()));
    const [content, setContent] = useState("");
    const {onCreate, onEdit} = useContext(DiaryDispatchContext);

    const handleClickEmote =(emotion) => {
        setEmotion(emotion);
    }

    const handleSubmit = () => {
        if(content.length < 1) {
            contentRef.current.focus();
            return;
        }

        if(isEdit){
            if(window.confirm('일기를 수정하시겠습니까?')) {
                onEdit(originData.id, date, content, emotion);
            }
        }else{
            if(window.confirm('새로운 일기를 작성하시겠습니까?')) {
                onCreate(date, content, emotion);
            }
        }

        navigate('/', {replace: true});
    }

    useEffect(() => {
        if(isEdit){
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setEmotion(originData.emotion);
            setContent(originData.content);
        }
    },[isEdit, originData]);

    return (
        <div className="DiaryEditor">
            <MyHeader
                headText={isEdit? '일기 수정하기':'새 일기쓰기'}
                leftChild={<MyButton
                    text={'뒤로가기'}
                    onClick={() => navigate(-1)}
                />}
            />
            <div>
                <section>
                    <h4>오늘은 언제인가요?</h4>
                    <div className="input-box">
                        <input type="date" value={date}
                               className="input-date"
                               onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                </section>
                <section>
                    <h4>오늘의 감정</h4>
                    <div className="input_box emotion_list_wrapper">
                        {emotionList.map((it) => (
                            <EmotionItem
                                key={it.emotion_id} {...it}
                                onClick={handleClickEmote}
                                isSelected={it.emotion_id === emotion}
                            />
                        ))}
                    </div>
                </section>
                <section>
                    <h4>오늘의 일기</h4>
                    <div className="input_box text_wrapper">
                        <textarea
                            placeholder="오늘은 어땟나요"
                            ref={contentRef}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </section>
                <section>
                    <div className="control_box">
                        <MyButton
                            text={"취소하기"}
                            onClick={() => navigate(-1)}
                        />
                        <MyButton
                            text={"작성완료"}
                            type={"positive"}
                            onClick={handleSubmit}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}

export default DiaryEditor;