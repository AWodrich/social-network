import axios from 'axios';

export function checkFriendStatus() {
    return axios.get('/status')
        .then(function({ data }) {
            return {
                type: 'RECEIVE_FRIENDSTATUS',
                users: data
            };
        });
}
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
            console.log('getting other user info?', data);
            return {
                type: 'OTHER_USER_INFO',
                otherUserInfo: data
            }
        })
}


export function getFriendshipStatus(id) {
    return axios.get('/friend-status/' + id)
        .then(({data}) => {
            console.log('getting friend status in action creator after axios request', data);
            return {
                type: 'CHECK_FRIEND_STATUS',
                statusFriendship: data.status
            }
        })
}

export function updateFriendshipStatus(id, status) {
    console.log('inside update friendship action creator, status', status);
    return axios.post('/friend-status/'+ id + '/update', {status})
        .then(({data}) => {
            console.log('after updating friend request', data);
            location.replace('/user/'+id)
        })
}
//
// export function terminateFriendship(id) {
//     return axios.post('/friend-status/' + id).then(function({ data }) {
//         return {
//             type: 'MAKE_HOT',
//             id: id
//         };
//     });
// }
//
// export function denyFriendRequest(id) {
//     return axios.post('/friend-status/' + id).then(function({ data }) {
//         return {
//             type: 'MAKE_HOT',
//             id: id
//         };
//     });
// }
