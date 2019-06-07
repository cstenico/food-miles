import {AsyncStorage} from 'react-native';

const TOKEN_STORAGE_KEY = 'jwt';

async function signIn (token) {
    try {
      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);
    } catch (error) {
      console.log("error");
    }
};
  
const getToken = async () => {
    try {
      return await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
    } catch (error) {
      return false
    }
};
  
const removeToken = async () => {
    try {
      await AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
      return true;
    } catch (error) {
      return false;
    }
};
  
const signOut = async() => {
    return await removeToken();
}
  
const isAuthenticated = () => {
    getToken().then((response) => {
        if (response != null){
        return true
        }
    }).catch((error) => {
        return false;
    }); 
}


const authenticate = credentials => {
    const baseUrl = 'https://food-miles.herokuapp.com'
    return fetch(baseUrl + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( credentials )
    }).then((data) => {
        console.log(data)
        return data;
    }, (fetchError) => {
        console.error(fetchError, 'No data response');
        return false;
    }).then(response => {
        console.log(response)
        return true;
    });
}


const signUp = credentials => {
    console.log(credentials)
    const baseUrl = 'https://food-miles.herokuapp.com'
    return fetch(baseUrl + '/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( credentials )
    }).then((data) => {
        console.log(data)
        return data;
    }, (fetchError) => {
        console.error(fetchError, 'No data response');
        return false;
    }).then(response => {
        console.log(response);
        return true;
    });
}


  export {authenticate, isAuthenticated, signOut, signIn, getToken, signUp}