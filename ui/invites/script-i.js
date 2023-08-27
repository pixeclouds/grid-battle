

document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('nav').classList.toggle('active');
});

document.querySelector('.create-invite-btn').addEventListener('click', (e) => {
    e.preventDefault()

    let token = localStorage.getItem('token')
    socket.emit('create-invite', token)

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