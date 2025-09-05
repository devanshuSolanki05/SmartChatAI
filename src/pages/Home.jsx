import '../App.css';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import ChatIcon from '@mui/icons-material/Chat';
import AddIcon from '@mui/icons-material/Add';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useContext } from 'react';
import { dataContext } from '../context/UserContext';
import Chat from './Chat';
import generateResponse from '../gemini';
import { query } from '../huggingFace';

const Home = () => {
  const {
    startRes,
    setStartRes,
    popUp,
    setPopUp,
    input,
    setInput,
    feature,
    setFeature,
    setShowResult,
    setPrevFeature,
    setGenImgUrl,
    user,
    setUser,
    setPrevUser,
  } = useContext(dataContext);

  // Submit Handler
  async function handleSubmit() {
    setStartRes(true);
    setPrevFeature(feature);
    setShowResult('');

    // Prepare newPrevUser object
    const newPrevUser = {
      data: user.data,
      mime_type: user.mime_type,
      imgUrl: user.imgUrl,
      prompt: input,
    };
    setPrevUser(newPrevUser);

    // Reset current user data
    setUser({
      data: null,
      mime_type: null,
      imgUrl: null,
    });
    setInput('');

    // Pass newPrevUser to generateResponse
    const result = await generateResponse(newPrevUser);
    setShowResult(result);
    setFeature('chat');
  }

  // Image Upload Handler
  function handleImage(e) {
    setFeature('upimg');
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result.split(',')[1];
      setUser((prev) => ({
        ...prev,
        data: base64,
        mime_type: file.type,
        imgUrl: `data:${file.type};base64,${base64}`,
      }));
    };
    reader.readAsDataURL(file);
  }

  // Generate Image Handler
  async function handleGenerateImg() {
    setStartRes(true);
    setPrevFeature(feature);
    setGenImgUrl('');
    // Prepare newPrevUser for image generation
    const newPrevUser = {
      data: user.data,
      mime_type: user.mime_type,
      imgUrl: user.imgUrl,
      prompt: input,
    };
    setPrevUser(newPrevUser);

    try {
      const response = await query(newPrevUser);
      const url = URL.createObjectURL(response);
      setGenImgUrl(url);
    } catch (error) {
      console.error('Image Generation Error:', error);
    }

    setInput('');
    setFeature('chat');
  }

  return (
    <div className="home">
      <nav>
        <div
          className="logo"
          onClick={() => {
            setStartRes(false);
            setFeature('chat');
            setUser({
              data: null,
              mime_type: null,
              imgUrl: null,
            });
            setPopUp(false);
          }}
        >
          Smart AI Bot
        </div>
      </nav>

      <input type="file" accept="image/*" hidden id="inputImg" onChange={handleImage} />

      {!startRes ? (
        <div className="hero">
          <span id="tag">What can I help you ?</span>
          <div className="cate">
            <div
              className="upImg"
              onClick={() => {
                setFeature('upimg');
                document.getElementById('inputImg').click();
              }}
            >
              <AddPhotoAlternateIcon />
              <span>Upload Image</span>
            </div>
            <div className="genImg" onClick={() => setFeature('genimg')}>
              <InsertPhotoIcon />
              <span>Generate Image</span>
            </div>
            <div className="chat" onClick={() => setFeature('chat')}>
              <ChatIcon />
              <span>Chat</span>
            </div>
          </div>
        </div>
      ) : (
        <Chat />
      )}

      <form
        className="input-box"
        onSubmit={(e) => {
          e.preventDefault();
          if (input) {
            if (feature === 'genimg') {
              handleGenerateImg();
            } else {
              handleSubmit();
            }
          }
        }}
      >
        {user.imgUrl && <img src={user.imgUrl} alt="preview" id="im" />}

        {popUp && (
          <div className="pop-up">
            <div
              className="select-up"
              onClick={() => {
                setPopUp(false);
                setFeature('upimg');
                document.getElementById('inputImg').click();
              }}
            >
              <AddPhotoAlternateIcon />
              <span>Upload Image</span>
            </div>
            <div
              className="select-gen"
              onClick={() => {
                setPopUp(false);
                setFeature('genimg');
              }}
            >
              <InsertPhotoIcon />
              <span>Generate Image</span>
            </div>
          </div>
        )}

        {/* Dynamic Plus Icon */}
        <div id="add" onClick={() => setPopUp((prev) => !prev)}>
          {feature === 'genimg' ? (
            <InsertPhotoIcon className="gen-icon" />
          ) : feature === 'upimg' ? (
            <AddPhotoAlternateIcon className="upload-icon" />
          ) : feature === 'chat' ? (
            <ChatIcon className="chat-icon" />
          ) : (
            <AddIcon />
          )}
        </div>

        <input
          type="text"
          placeholder="Ask Something..."
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />

        {input && (
          <button id="submit">
            <ArrowUpwardIcon />
          </button>
        )}
      </form>
    </div>
  );
};

export default Home;