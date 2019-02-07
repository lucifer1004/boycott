import qs from 'qs'
import {YelpBusinessesSearchRequest} from '../common'

const token = `UevYX7XDUhthQaZyhSSzRTmLzJp1iTzy1hhFbORu7EQ5F1C2pscgO1FQiXfpWIb8_aeBOvI_usmRISB0rlh_SVuI6aSoV5SXZF17FWTr3s0mXzHawWTKSY8Os61ZXHYx`

const headers = {
  Authorization: `Bearer ${token}`,
}

const baseUrl = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/`

const urlize = (endpoint: string, query: YelpBusinessesSearchRequest) =>
  `${baseUrl}${endpoint}?${qs.stringify(query)}`

export const businessesSearch = (query: YelpBusinessesSearchRequest) =>
  fetch(urlize('businesses/search', query), {headers})
    .then(res => res.json())
    .then(results => {
      console.log(results)
      return results
    })
// axios.get(urlize('businesses/search/', query), {headers}).then(results => {
//   console.log(results)
//   return results
// })
