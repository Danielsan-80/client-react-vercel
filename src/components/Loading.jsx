import styles from '../modules/loading.module.css'

const Loading = () => {
  return (
    <div>
        
       <p>Loading...</p>
       <span className={styles.dotOne}>.</span><span className={styles.dotTwo}>.</span><span className={ styles.dotThree}>.</span>

    </div>
  )
}

export default Loading