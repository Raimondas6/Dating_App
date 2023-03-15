import { useRef, useState, useContext } from 'react'
import mainContext from '../context/mainContext';
import { fetchPost, citiesList, genderList } from '../components/Functions';
const FilterPage = () => {
    const { user, setUser } = useContext(mainContext)
    const city = useRef()
    const ageMax = useRef()
    const gender = useRef()
    const [ageOut, setAgeOut] = useState(user.filterAgeMax)
    function saveFilter(){
        const filter = {
            ageMax: ageMax.current.value,
            gender: gender.current.value,
            city: city.current.value,
            user
        }
        fetchPost('setFilter', filter, data => setUser(data.user))
    }
    return (
        <div className='FilterPage block page'>
            <select ref={city} defaultValue={user.filterCity}>
                {citiesList.map((x, i) => <option key={i} value={x}>{x}</option> )}
            </select>
            <select ref={gender} defaultValue={user.filterGender}>
                {genderList.map((x, i) => <option key={i} value={x}>{x}</option> )}
            </select>
            <div className='range'>
                <h4>18</h4>
                <input
                    ref={ageMax} min='18' max='50' type='range'
                    step='1'
                    defaultValue={user.filterAgeMax}
                    onInput={()=> setAgeOut(ageMax.current.value)}
                />
                <h4>{ageOut}</h4>
            </div>
            <button onClick={saveFilter}>Save Filter</button>
        </div>
    )
}
export default FilterPage;