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
    const baseUrl = __DEV__ ? 'http://192.168.0.102:3000' : 'https://google.com'
    return fetch(baseUrl + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auth: credentials })
    }).then((data) => {
        return data.json();
    }, (fetchError) => {
        console.error(fetchError, 'No data response');
        return false;
    }).then(response => {
        if(response.status === 'success') {
            signIn(response.jwt);
            return true;
        } else {
            return false;
        }
    });
}



  export {authenticate, isAuthenticated, signOut, signIn, getToken}