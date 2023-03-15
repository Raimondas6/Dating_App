import { useRef, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import mainContext from '../context/mainContext'
import { fetchPost, citiesList, genderList } from '../components/Functions'
const LoginPage = () => {
    const { setLogin, setUser } = useContext(mainContext)
    const nav = useNavigate();
    const usernameL = useRef()
    const passwordL = useRef()
    const checkbox = useRef()
    const usernameR = useRef()
    const passwordR1 = useRef()
    const passwordR2 = useRef()
    const gender = useRef()
    const city = useRef()
    const age = useRef()
    const [error, setError] = useState('')

    function loginBtn(){
        const user = {
            username: usernameL.current.value,
            password: passwordL.current.value,
            checkbox: checkbox.current.checked,
        }
        fetchPost('login', user, data => {
            if (!data.error) {
                setLogin(true)
                setUser(data.user)
                nav('/profile')
            } else setError(data.status)
        })
    }
    function register(){
        if (passwordR1.current.value!==passwordR2.current.value) return setError('passwords dont match')
        const user = {
            username: usernameR.current.value,
            password: passwordR1.current.value,
            city: city.current.value,
            gender: gender.current.value,
            age: age.current.value,
        }
        fetchPost('register', user, data => {
            setError(data.status)
            if(!data.error) {
                usernameR.current.value = ''
                passwordR1.current.value = ''
                passwordR2.current.value = ''
                city.current.value = ''
                gender.current.value = ''
                age.current.value = ''
            }
        })
    }
    return (
        <div className='LoginPage page block'>
            <div className='forms'>
                <div className='login'>
                    login
                    <input onKeyDown={e=>e.key==='Enter' && loginBtn()} ref={usernameL} type='text' autoFocus placeholder='username' defaultValue='Petras'/>
                    <input ref={passwordL} type='password' placeholder='password' defaultValue='petras'/>
                    <div className='checkbox'>
                        <input ref={checkbox} id='remember' type="checkbox" defaultChecked/>
                        <label htmlFor='remember'>remember me</label>
                    </div>
                    <button onClick={loginBtn} >Login</button>
                </div><br/>
                <div className='register'>
                    register
                    <input ref={usernameR} type='text' placeholder='username'/>
                    <input ref={passwordR1} type='password' placeholder='password'/>
                    <input ref={passwordR2} type='password' placeholder='password'/>
                    <select ref={city}>
                        {citiesList.map((x, i)=><option key={i} value={x}>{x}</option>)}
                    </select>
                    <select ref={gender}>
                        {genderList.map((x, i)=><option key={i} value={x}>{x}</option>)}
                    </select>
                    <input ref={age} type='number' min='18' max='50' step='1' placeholder='age'/>
                    <button onClick={register}>Register</button>
                </div>
            </div>
            <h1>{error}</h1>
        </div>
    );
};

export default LoginPage;