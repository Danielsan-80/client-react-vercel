import styles from '../modules/login.module.css'
import PostForm from '../components/PostForm'

const Create = () => {

  return (
    <div className={styles.container}>
    <h1 className={styles.title}>Add Post</h1>
        <PostForm />
    </div>
  )
}

export default Create