import {store} from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

class notify {
    appname() {
        return 'CLASSROOMS';
    }
    APP_URL(){
        return 'http://localhost:8000/';
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