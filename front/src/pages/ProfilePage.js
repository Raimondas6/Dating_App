import { useContext, useState, useRef } from 'react'
import mainContext from '../context/mainContext'
import Carousel from '../components/Carousel'
import { fetchPost } from '../components/Functions'
const ProfilePage = () => {
    const img = useRef()
    const [error, setError] = useState();
    const { user, setUser } = useContext(mainContext)
    function upload(){
        fetchPost('imageUpload', {image:img.current.value, user}, data => {
            if (!data.error) {
                setError(data.status)
                setUser(data.user)
            } else {
                setError(data.status)
            }
            img.current.value = ''
        })
    }
    return (
        <div className='ProfilePage block page'>
            <Carousel user={user}/>
            <h1>{user.username}: a {user.age} year old {user.gender} in {user.city}</h1>
            <div className='upload'>
                <input ref={img} type='text' placeholder='image url'/>
                <button onClick={upload} >Upload</button>
            </div>
            <h1>{error}</h1>
        </div>
    );
};

export default ProfilePage;