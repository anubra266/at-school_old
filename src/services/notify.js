import {store} from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

class notify {
    
    date(date){
        const options = {weekday:"short", year: "numeric", month: "long", day: "numeric", hour:"numeric", minute:"numeric", hour12:true}
        return new Date(date).toLocaleString(undefined, options)
    }
    appname() {
        return 'at-School';
    }
    APP_URL(){
        var url = window.location.hostname;
        if(url==='localhost'){ 
            return 'http://localhost:8000/';
        }
        return 'https://api.at-school.xyz/';
    }
    user(title, message, type) {
        store.addNotification({
            title: title, message: message, type: type, // 'default', 'success', 'info', 'warning'
            insert: "top", // where to add the notification to another
            container: 'bottom-right', // where to position the notifications
            animationIn: [
                "animated", "fadeIn"
            ], // animate.css classes that's applied
            animationOut: [
                "animated", "fadeOut"
            ], // animate.css classes that's applied
            dismiss: {
                duration: 3000
            }
        })
    }


}

export default new notify();