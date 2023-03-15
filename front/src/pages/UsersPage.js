import { useEffect, useContext } from 'react'
import mainContext from '../context/mainContext';
import Carousel from '../components/Carousel';
import { fetchPost } from '../components/Functions';
const UsersPage = () => {
    const { login, user, setUser, users, setUsers, socket } = useContext(mainContext)
    useEffect(()=>{
        setUsers([])
        fetchPost('users', user, data => {
            if(user) {
                data.users = data.users.filter(x=>
                    x.city===user.filterCity &&
                    x.gender===user.filterGender &&
                    x.age<=user.filterAgeMax &&
                    !user.likesGiven.includes(x._id)
                )
                setUsers(data.users)
            }
        })
    }, [])
    function pass(){
        setUsers(old => {
            old.shift()
            return [...old]
        })
    }
    function like(id){
        setUsers(old => {
            old.shift()
            return [...old]
        })
        const message = {message: `You've just now been liked by ${user.username}!`, id}
        socket.emit('alert', message)
        fetchPost('like', {currentUser: users[0], loggedInUser: user}, data => setUser(data.user))
    }
    return (users.length > 0 ?
            <div className='UsersPage block page'>
                <Carousel user={users[0]} />
                <h1>{users[0].username} {users[0].age}</h1>
                <div className='buttons'>
                    <button onClick={pass}>Pass 👎🏼</button>
                    <button onClick={()=>like(users[0]._id)}>Like 💖</button>
                </div>
            </div>
            :
            <div className='UsersPage block page'>
                <h3>No more users :(</h3>
            </div>
    )
}

export default UsersPage;