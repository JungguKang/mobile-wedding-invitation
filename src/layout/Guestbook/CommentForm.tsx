import { useState } from 'react';
import styled from '@emotion/styled';
import { ref, push, serverTimestamp } from 'firebase/database';
import { db } from '../../firebase';

const CommentForm = () => {
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !message) {
      alert('이름과 메시지를 채워주세요. 🥹');
      return;
    }

    setLoading(true);
    try {
      const guestbookRef = ref(db, 'guestbook');
      const newComment = {
        name: name,
        message: message,
        createdAt: serverTimestamp(),
      };
      await push(guestbookRef, newComment);

      alert('메시지를 보냈습니다. 💌');
      setName('');
      setMessage('');
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('메시지 전송에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <NameInput
        placeholder="이름"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <MessageInput
        placeholder="메시지"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <SubmitButton type="submit" disabled={loading}>
        {loading ? '보내는 중...' : '등록'}
      </SubmitButton>
    </FormWrapper>
  );
};

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: visible;
  align-items: center;
`;

const NameInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 4px;
  font-size: 1rem;
  line-height: 1;
  outline: none;
  border: 1px solid #ccc;
  font-family: inherit;
  font-weight: 300;
`;

const MessageInput = styled.textarea`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 4px;
  font-size: 1rem;
  line-height: 1.5;
  outline: none;
  border: 1px solid #ccc;
  resize: none;
  font-family: inherit;
  font-weight: 300;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid lightgray;
  background-color: white;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
  cursor: pointer;

  &:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
  }
`;
export default CommentForm;
