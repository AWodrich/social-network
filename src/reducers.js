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
        state = Object.assign({}, state, {
            statusFriendship: action.statusFriendship.status
        })
    }
    if(action.type == 'FRIEND_LIST') {
        state = Object.assign({}, state, {
            friends: action.friends
        })
    }
    if (action.type == 'USERS_ONLINE') {
        console.log('action', action, 'action.user', action.users);
        state = Object.assign({}, state, {usersOnline: action.users});
    }

    if (action.type == 'NEW_USER') {
        console.log('solving issue?', action.id);
        state = Object.assign({}, state, {
            usersOnline: state.usersOnline.concat([action.id])
        })
    }
    if (action.type == 'USER_LEFT') {
        console.log('user left', action);
        state = Object.assign({}, state, {
            usersOnline: state.usersOnline.filter(usersOnline => usersOnline.id !== action.id.userLeft),
        })
    }

    return state;
}
