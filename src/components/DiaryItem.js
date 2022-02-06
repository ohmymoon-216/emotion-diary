import MyButton from "./MyButton";
import {useNavigate} from "react-router-dom";

const DiaryItem = ({id, emotion, content, date}) => {

    const navigatge = useNavigate();

    const goDetail = () => {
        navigatge(`/diary/${id}`);
    };

    const goEdit = () => {
        navigatge(`/edit/${id}`);
    }

    const strDate = new Date(parseInt(date)).toLocaleDateString();
    return (
        <div className="DiaryItem">
            <div
                onClick={goDetail}
                className={["emotion_img_wrapper", `emotion_img_wrapper_${emotion}`].join(" ")}>
                <img src={`/assets/emotion${emotion}.png`}/>
            </div>
            <div onClick={goDetail} className="info_wrapper">
                <div className="diary_date">
                    {strDate}
                </div>
                <div className="diary_content_preview">
                    {content.slice(0,25)}
                </div>
            </div>
            <div onClick={goEdit} className="btn_wrapper">
                <MyButton
                    text={'수정하기'}
                />
            </div>
        </div>
    );
};

export default DiaryItem;