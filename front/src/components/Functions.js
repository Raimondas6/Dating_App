module.exports = {
    fetchPost: (url, data, callback) => {
        const options = {
            method: 'POST',
            headers: {"content-type":"application/json"},
            body: JSON.stringify(data),
            credentials: 'include'
        }
        fetch(`http://localhost:4000/${url}`, options)
            .then(res => res.json())
            .then(callback)
    },
    fetchGet: (url, callback) => {
        const options = {
            method: 'GET',
            headers: {"content-type":"application/json"},
            credentials: 'include'
        }
        fetch(`http://localhost:4000/${url}`, options)
            .then(res => res.json())
            .then(callback)
    },
    citiesList: ['Vilnius', 'Kaunas', 'Klaipėda', 'Šiauliai', 'Panevėžys', 'Utena', 'Marijampolė', 'Telšiai', 'Alytus', 'Tauragė'],
    genderList: ['male', 'female']
}