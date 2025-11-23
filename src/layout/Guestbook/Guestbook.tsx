import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import { IComment } from '../../types/data';
import CommentForm from './CommentForm.tsx';
import { Heading2 } from '@/components/Text.tsx';

const Guestbook = () => {
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'guestbook'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          message: data.message,
          createdAt: data.createdAt?.toDate(), // Firestore Timestamp를 Date 객체로 변환
        };
      });
      setComments(fetchedComments);
    });

    // 컴포넌트가 언마운트될 때 실시간 리스너 정리
    return () => unsubscribe();
  }, []);

  return (
    <GuestBookWrapper>
      <Heading2>
        메시지를 남겨주세요.
        <br />
        결혼식 하루 뒤, 신랑 신부에게 전달됩니다.
      </Heading2>
      <CommentForm />
      <CommentList>
        {comments.map((comment) => (
          <CommentItem key={comment.id}>
            <CommentHeader>
              <CommentAuthor>{comment.name}</CommentAuthor>
              <CommentDate>
                {comment.createdAt?.toLocaleDateString()}
              </CommentDate>
            </CommentHeader>
            <CommentMessage>{comment.message}</CommentMessage>
          </CommentItem>
        ))}
      </CommentList>
    </GuestBookWrapper>
  );
};

export default Guestbook;

const GuestBookWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 50px;
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CommentItem = styled.li`
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 12px;
  background-color: #fafafa;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const CommentAuthor = styled.span`
  font-weight: 500;
  font-size: 0.9rem;
`;

const CommentDate = styled.span`
  font-size: 0.8rem;
  color: #888;
`;

const CommentMessage = styled.p`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.4;
  white-space: pre-wrap; /* 줄바꿈과 공백을 유지합니다 */
`;
