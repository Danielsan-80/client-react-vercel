import styles from '../modules/blogcard.module.css'
import {Link} from 'react-router-dom'

const BlogCard = ({post}) => {

  
  return (
    <Link to={'/blog/'+post._id}><div className={styles.postCard}>
       <img src="//unsplash.it/300/300" className={styles.cardImg} />
      <h1>{post.title}</h1>
        <div className={styles.postDetails}>
          <p><i className="far fa-user"></i> {post.author.name}</p>
          <p><i className="far fa-clock"></i> {Intl.DateTimeFormat("it-IT", {weekday: "long", month: "short", year: "numeric", day: "numeric"}).format(new Date(post.updatedAt))}</p>
        </div>
    </div>
    </Link>
  )
}

export default BlogCard