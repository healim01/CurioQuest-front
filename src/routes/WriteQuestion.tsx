import { styled } from 'styled-components';
import Divider from '@mui/material/Divider';
import CategoryHeader from '../components/CategoryHeader';
import { ChangeEvent, useEffect, useState } from 'react';
import CameraAltTwoToneIcon from '@mui/icons-material/CameraAltTwoTone';
import theme from '../theme';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { CategoryIdState } from '../store/atom';
import { BASE_URL } from '../apis/Questions';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  font-size: 20px;

  &:focus {
    outline: none;
  }
`;

const ContentInput = styled.textarea`
  width: 100%;
  padding: 10px;
  border: none;
  font-size: 14px;

  &:focus {
    outline: none;
  }
`;

const SmallImg = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-left: 10px;
`;

const BottomBar = styled.div<BottomBarProps>`
  position: fixed;
  bottom: ${(props) => props.keyboardHeight}px; // Use a prop for keyboard height
  left: 0;
  right: 0;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 20px 40px;
  height: 70px;
  border-top: 1px solid #ccc;
`;

const TextButton = styled.button`
  display: flex;
  align-items: center;
  color: ${theme.palette.mono.gray2};
  background-color: white;
  border: none;
`;

interface BottomBarProps {
  keyboardHeight: number;
}

export default function WriteQuestion() {
  const history = useHistory();
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useRecoilState(CategoryIdState);
  // const [selectedImage, setSelectedImage] = useState<string | null>(null); // Specify the type for selectedImage

  const subminQuestion = async () => {
    const member_id = 1;
    const response = await axios
      .post(`${BASE_URL}/questions/${selectedCategoryId}/${member_id}`, {
        questionTitle: title,
        questionContent: content,
        // 여기에 필요한 다른 데이터도 추가 가능
      })
      .then((response) => console.log(response.data));
    history.push('/');
  };

  useEffect(() => {
    const handleResize = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.clientHeight;
      const diff = windowHeight - documentHeight;
      setKeyboardHeight(diff);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   // Add type annotation for event
  //   const file = event.target.files?.[0]; // Use optional chaining to access files property
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setSelectedImage(reader.result as string); // Cast reader.result to string
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  return (
    <>
      <CategoryHeader />
      <Form>
        <Divider light style={{ width: '100%', margin: '10px 0' }} />
        <TitleInput placeholder="제목" />
        <Divider light style={{ width: '100%' }} />
        <ContentInput placeholder="궁금한 질문을 이곳에 적어보세요." style={{ height: '50vh' }} />
        {/* {selectedImage && <SmallImg src={selectedImage} alt="Selected" />} */}
        <BottomBar keyboardHeight={keyboardHeight}>
          {/* <label htmlFor="image-upload">
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <CameraAltTwoToneIcon style={{ color: theme.palette.color.main }} />
          </label> */}
          <div />
          <TextButton onClick={subminQuestion}> 등록 </TextButton>
        </BottomBar>
      </Form>
    </>
  );
}
