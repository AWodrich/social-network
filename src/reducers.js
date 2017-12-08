import { getUserInfos, getFriends } from './actions';



export default function(state = {}, action) {
    if (action.type == 'USER_INFO') {
        state = Object.assign({}, state, {
            user: action.userInfo
        });
    }
    if (action.type == 'OTHER_USER_INFO') {
        state = Object.assign({}, state, {
            otherUserInfo: action.otherUserInfo
        })
    }
    if(action.type == 'CHECK_FRIEND_STATUS') {
        state = Object.assign({}, state, {
            statusFriendship: action.statusFriendship.status,
            sender: action.statusFriendship.senderId,
            recipient: action.statusFriendship.recipientId
        })
    }
    if(action.type == 'UPDATE_FRIEND_STATUS') {
        // console.log('action after update in reducer?', action);
        state = Object.assign({}, state, {
            statusFriendship: action.statusFriendship.status
        })
    }
    if(action.type == 'FRIEND_LIST') {
        console.log('what is action in reducer for friend list?++++', action.friends);
        state = Object.assign({}, state, {
            friends: action.friends
        })
    }



    return state;
}
