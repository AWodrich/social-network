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

export function getFriends(id) {
    console.log('inside get friend lists action creator');
    return axios.get('/user/' + id + '/friends')
    .then(friends => {
        console.log('getting friends on client side', friends.data);
        return {
            type: 'FRIEND_LIST',
            friends: friends.data.friends
        }
    })
}

export function endFriendship(friendId, userId) {
    return axios.post('/friend-status/'+ friendId + '/update', {status:4, friendId:friendId})
    .then(({data}) => {
        location.replace('/friends')
    })
}

export function acceptFriendship(friendId, userId) {
    return axios.post('/friend-status/'+ friendId + '/update', {status:3, friendId:friendId})
    .then(({data}) => {
        location.replace('/friends')

    })
}

export function usersOnline(users){
    console.log('in actions usersOnline');
  console.log('onlineData', users);
  // return axios.get('/connected/')
  return {type: 'USERS_ONLINE', users};
}

export function userJoined(id){
  console.log('joinedData', id);
  return {type: 'NEW_USER', id};
}

export function userLeft(id){
  console.log('leftData', id);
  return {type: 'USER_LEFT', id};
}
