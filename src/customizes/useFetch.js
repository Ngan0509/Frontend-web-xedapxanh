import { useEffect, useState } from 'react'
import axios from 'axios'

function useFetch(url) {
    const [data, setData] = useState([])
    useEffect(() => {
        async function fetchData() {
            let resp = await axios.get(url)
            console.log("resp", resp)
            let data = resp && resp.data ? resp.data : []

            setData(data)
        }
        // fetchData()
        const myTimeOut = setTimeout(fetchData, 1000)
        return () => {
            clearTimeout(myTimeOut)
        }
    }, [url])

    return {
        data
    }
}

export default useFetch