
import { Avatar } from './Avatar'
import { Comment } from './Comment'
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import styles from './Post.module.css'
import { useState, FormEvent, ChangeEvent, InvalidEvent} from 'react'

export interface PostType {
  id: number;
  author: {
    name: string;
    role: string;
    avatarUrl: string;
  },
  publishedAt: Date;
  content: Content[];
}

interface PostProps {
  post: PostType;
}

interface Content {
  content: string;
  type: 'paragraph' | 'link';
}

export function Post({post}: PostProps) {

  const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {locale: ptBR,})

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true,
  })

  const [comments, setComments] = useState([
    'Post muito bacana, parabéns!'
  ]);

  const [newCommentText, setNewCommentText] = useState('')

  function handleNewComment(event: FormEvent) {
    event.preventDefault();
    setComments([...comments, newCommentText]);
    setNewCommentText('');
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');
    setNewCommentText(event.target.value);
  }

  
  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Este campo é obrigatório');
  }

  function deleteComment(commentToDelete: string){
    const newCommentList = comments.filter(comment => {
      return comment !== commentToDelete;
    })
    setComments(newCommentList);	
  }


  return(
    <article className={styles.post}>
      <header className={styles.headerAuthor}>
        <div className={styles.author}>
          <Avatar
            src={post.author.avatarUrl}
            alt=""
          />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {post.content.map(line => {
          if (line.type === 'paragraph') {
            return <p key={line.content}>{line.content}</p>
          } else if (line.type === 'link') {
            return <p key={line.content}><a href='#'>{line.content}</a></p>
          }
        })}
      </div>

      <form onSubmit={handleNewComment} className={styles.commentForm}>
        <strong>Deixe seu comentário</strong>
        
        <textarea 
          name="comment"
          placeholder="Deixe um comentário"
          value = {newCommentText}
          onChange = {handleNewCommentChange}
          required
          onInvalid={handleNewCommentInvalid}
        >
          
        </textarea>

        <footer>
          <button type='submit' disabled={newCommentText.length == 0}>Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => {
          return <Comment 
                    content={comment}
                    key={comment}
                    deleteComment = {deleteComment}
                  />;
        })}
      </div>
    </article>
  )
}