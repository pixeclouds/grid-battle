

document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('nav').classList.toggle('active');
});

// document.querySelector('.create-invite-btn').addEventListener('click', (e) => {
//     e.preventDefault()

//     let token = localStorage.getItem('token')
//     socket.emit('create-invite', token)

// })





// switch to create invite modal
document.querySelector('.create-invite-btn').addEventListener('click', (e) => {
    e.preventDefault()
    document.querySelector('.container-modal').style.display = 'block'
    document.querySelector('.container').style.display = 'none'
})
// switch back to invite list
document.querySelector('.cancel-button').addEventListener('click', (e) => {
    e.preventDefault()
    document.querySelector('.container-modal').style.display = 'none'
    document.querySelector('.container').style.display = 'block'
})

// handle public invite creation 
document.querySelector('.create-public-invite').addEventListener('click', (e) => {
    e.preventDefault()
    let token = localStorage.getItem('token')
    let invite = {
        token, 
        type: 'public'
    }
    // console.log(invite)
    createPublicInvite(invite)
    
})
// handle private invite creation 
document.querySelector('.create-private-invite').addEventListener('click', (e) => {
    e.preventDefault()
    let token = localStorage.getItem('token')
    let receiver = document.querySelector('.recipient').value
    if (receiver == '') {
        window.alert('username cannot be empty')
    } else {
        let invite = {
            token, 
            receiver,
            type: 'private'
        }
        createPrivateInvite(invite)
    }
    
})


const updateInviteUI = (invites) => {     

    // check if there are any open invites
    if (invites.length < 1){
        document.querySelector('.no-invites-message-box').style.display = 'block'
    } else {
        let inviteContainer = document.querySelector('.invite-container')
        inviteContainer.innerHTML = ''
    
        // add the updated list of invites to the UI
        invites.forEach(invite => {
            let inviteBox = document.createElement('div')
            inviteBox.classList.add('invite-box')
    
            let inviteCreator = document.createElement('div')
            inviteCreator.classList.add('invite-creator')
            inviteCreator.textContent = invite.username
    
            let joinBtn = document.createElement('button')
            joinBtn.classList.add('join-btn', `${invite.gameroom}`)
            joinBtn.textContent = "Join"
    
            inviteBox.appendChild(inviteCreator)
            inviteBox.appendChild(joinBtn)
            inviteContainer.appendChild(inviteBox)
            
        })
    }

}

document.querySelector('.invite-container').addEventListener('click', e => {
    if (e.target.classList.contains('join-btn')) {

        let gameroom = e.target.classList[1]
        let gameData = { 
            gameroom: gameroom, 
            type: 'public'
            
        }

        localStorage.setItem('gameData', JSON.stringify(gameData))
        let token = localStorage.getItem('token')
        updateInvite(gameroom, token)
        window.location.href = '/gameroom'

    }
})

const showJoinError = (err) => {
    window.alert(err)
}