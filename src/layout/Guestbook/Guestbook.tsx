import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { ref, onValue, query, orderByChild } from 'firebase/database';
import { db } from '../../firebase';
import { IComment } from '../../types/data';
import CommentForm from './CommentForm.tsx';
import { Heading2 } from '@/components/Text.tsx';

const Guestbook = () => {
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    const guestbookRef = ref(db, 'guestbook');
    const q = query(guestbookRef, orderByChild('createdAt'));

    const unsubscribe = onValue(q, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const fetchedComments = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        // 최신순으로 정렬하기 위해 배열을 뒤집습니다.
        setComments(fetchedComments.reverse());
      } else {
        setComments([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <GuestBookWrapper>
      <Heading2>
        정구와 유리에게 축하의 메시지를 남겨주세요.
      </Heading2>
      <CommentForm />
      <CommentList>
        {comments.map((comment) => (
          <CommentItem key={comment.id}>
            <CommentHeader>
              <CommentAuthor>{comment.name}</CommentAuthor>
              <CommentDate>
                {new Date(comment.createdAt).toLocaleDateString()}
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
  font-family: RoundedFixedsys, serif;
  list-style: none;
  padding: 0;
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CommentItem = styled.li`
  font-family: RoundedFixedsys, serif;
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
