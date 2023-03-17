import styles from '../modules/login.module.css'
import AuthForm from '../components/AuthForm'

const Register = () => {
  return (
    <div className={styles.container}>
     <h1 className={styles.title}>Sign Up</h1>
     <AuthForm />
     </div>
  )
}

export default Register