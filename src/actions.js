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
        return {
            type: 'UPDATE_FRIEND_STATUS',
            statusFriendship: data
        }
    })
}

export function getFriends(id) {
    return axios.get('/user/' + id + '/friends')
    .then(friends => {
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
    return {type: 'USERS_ONLINE', users};
}

export function userJoined(id){
    return {type: 'NEW_USER', id};
}

export function userLeft(id){
    return {type: 'USER_LEFT', id};
}

export function postMessage(message) {
    console.log('in post message', message);
    let data = {
        messageContents: message
    }
    return axios.post('/chat.json/', data)
    .then(results => {
        return {type: 'NEW_MESSAGE', message};
    })
}

export function getMessages(messages) {
    return axios.get('/chat.json/')
    .then(data => {
        console.log('here should be the message data========', data);
        return {type: 'ALL_MESSAGES', messages: data.data};
    });
}


export function getNews() {
    const url = 'https://newsapi.org/v2/top-headlines?' +
                'sources=crypto-coins-news&' +
                'apiKey=8a37cb8f51b6445faff2aa74c0655cf4'
    return axios.get(url)
      .then(res => {
          return {type: 'FETCH_NEWS', news: res.data.articles};
      });
}
