import { useContext } from 'react';
import { dataContext } from '../context/UserContext';

const Chat = () => {
  const { prevUser, showResult, prevFeature, genImgUrl } = useContext(dataContext);

  // Prevent errors if prevUser is undefined
  const safePrevUser = prevUser || {};

  return (
    <div className="chat-page">
      <div className="user">
        {prevFeature === "upimg" ? (
          <>
            {safePrevUser.imgUrl && <img src={safePrevUser.imgUrl} alt="user" />}
            <span>{safePrevUser.prompt || ""}</span>
          </>
        ) : (
          <span>{safePrevUser.prompt || ""}</span>
        )}
      </div>

      <div className="ai">
        {prevFeature === "genimg" ? (
          <>
            {!genImgUrl ? <span>Genrating Image...</span> : <img src={genImgUrl} alt="" />}
          </>
        ) : (
          !showResult ? <span>Loading...</span> : <span>{showResult}</span>
        )}
      </div>
    </div>
  );
};

export default Chat;
