import styles from '../modules/blogcard.module.css'
import {Link} from 'react-router-dom'

const BlogCard = ({post}) => {

  const featuredImg = post.featuredImg
  
  function arrayBufferToBase64(buffer) {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

  
  return (
    <Link to={'/blog/'+post._id}><div className={styles.postCard}>
      <div className={styles.cardImg}>
       {featuredImg ? <img src={`data:image/jpg;base64,${arrayBufferToBase64(featuredImg.data)}`} width="300px"/>
        : <img src="//unsplash.it/300/300" />
        }
      </div>
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