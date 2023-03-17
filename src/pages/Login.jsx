import styles from '../modules/login.module.css'
import AuthForm from '../components/AuthForm'

const Login = () => {
  return (
    <div className={styles.container}>
     <h1 className={styles.title}>Login</h1>
     <AuthForm />
     </div>
  )
}

export default Login