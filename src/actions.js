import axios from 'axios';


export function getUserInfos() {
    return axios.get('/user')
    .then(({data}) => {
        return {
            type: 'USER_INFO',
            userInfo: data
        }
    })
}

export function getOtherUserInfo(id) {
    return axios.get('/user.json/' + id)
    .then(({data}) => {
        return {
            type: 'OTHER_USER_INFO',
            otherUserInfo: data
        }
    })
}


export function getFriendshipStatus(id) {
    return axios.get('/friend-status/' + id)
    .then(({data}) => {
        return {
            type: 'CHECK_FRIEND_STATUS',
            statusFriendship: data
        }
    })
}

export function updateFriendshipStatus(id, status) {
    return axios.post('/friend-status/'+ id + '/update', {status:status})
    .then(({data}) => {
        console.log('after updating friend request', data);
        return {
            type: 'UPDATE_FRIEND_STATUS',
            statusFriendship: data
        }
    })
}

export function getFriends() {
    console.log('inside get friend lists action creator');
    return axios.get('/friends')
    .then(friends => {
        console.log('getting friends on client side', friends.data);
        return {
            type: 'FRIEND_LIST',
            friends: friends.data.filtered
        }
    })
}

// export function getPendingFriends() {
//     console.log('inside pending friends action');
//     return axios.get('/friends')
// }
