import io from "socket.io-client";
import * as config from '../../configs/appsettings.json';
import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty'
import moment from 'moment'

class SocketApiUtils {
    createSocketConnection = () => (
        io(config.chatUrl, {
            withCredentials: false,
            extraHeaders: {
                "Access-Control-Allow-Origin": "*"
            }
        })
    )

    disconnectChat = (socket) => socket.disconnect();

    registerMessageEvent = (socket, props) => {
        socket.on("message", ({ from, message, to }) => {
            const { updateMessageList } = props;
            if (document.getElementById('conversation-messages')) {
                setTimeout(() => {
                    let objDiv = document.getElementById('conversation-messages');
                    objDiv.scrollTop = objDiv.scrollHeight;
                }, 100)
            }
            if (_get(message, 'text.url')) {
                const newMessage = {
                    from,
                    to,
                    message: _get(message, 'text.url'),
                    createdDate: moment(new Date())
                }
                if (!_isEmpty(newMessage)) {
                    updateMessageList(newMessage);
                }
            }
        })
        // return () => {
        //   clearListedProducts()
        // }
    }
}

export const socketUtils = new SocketApiUtils()