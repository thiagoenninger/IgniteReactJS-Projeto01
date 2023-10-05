
import {ThumbsUp, Trash} from '@phosphor-icons/react'
import styles from './Comment.module.css';
import { Avatar } from './Avatar';
import { useState } from 'react';
import {format, formatDistanceToNow} from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

interface CommentProps {
  content: string;
  deleteComment: (comment: string) => void;
}

export function Comment({content, deleteComment}: CommentProps) {

  const [likeCount, setLikeCount] = useState(0);
  
  function handleDelete() {
    deleteComment(content)
  }

  function handleLikeCount() {
    setLikeCount((state) => {
      return state + 1;
    });
  }
  
  const publishedDateFormatted = format(new Date(), "d 'de' LLLL 'às' HH:mm'h'", {locale: ptBR,})

  const publishedDateRelativeToNow = formatDistanceToNow(new Date(), {
    locale: ptBR,
    addSuffix: true,
  })

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/thiagoenninger.png" alt="" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Thiago Enninger</strong>
              <time title={publishedDateFormatted} dateTime={new Date().toISOString()}>
              {publishedDateRelativeToNow}
              </time>
            </div>

            <button 
              title='Delete comment'
              onClick={handleDelete}  
            >
              <Trash size={20} />
            </button>
          </header>

          <p>{content}</p>
        </div>
        <footer>
          <button 
            onClick = {handleLikeCount}
            disabled = {likeCount >= 1}  
          >
            <ThumbsUp size={24}/>
            Curtir
          </button>
          <span>{likeCount}</span>
        </footer>
      </div>
    </div>
  );
}