export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('cbt-app'));
  
    if (user && user.accessToken) {
      return { Authorization: 'Bearer ' + user.accessToken };
    } else {
      return {};
    }
  }