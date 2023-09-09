
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('nav').classList.toggle('active');
});

function updateNotiticationUI(notifications) {
    let notificationDiv = document.querySelector('.notifications')
    notificationDiv.innerHTML = ''


    if (notifications.length == 0) {
        // display no notifications message
        document.querySelector('.no-invites-message-box').style.display = 'block'
    } else {
        notificationDiv.innerHTML = ''
        notifications.forEach(notification => {
            if (notification.type == 'public') {
                // console.log(notification)

                let notifBox =  document.createElement('div')
                notifBox.classList.add('notification-box', 'public-created')

                let notifText = document.createElement('p')
                notifText.classList.add('notification-text')
                notifText.innerText ='You created a public Invite'

                let actionDiv = document.createElement('div')
                actionDiv.classList.add('notification-actions')

                let btn = document.createElement('button')
                btn.classList.add('notification-button', 'decline', `${notification.type}`, `${notification.gameroom}`)

                if (notification.joined == 'true') {

                    btn.innerText = 'Joined'
                    btn.classList[1] = 'joined'
                    classes = btn.className.split(' ')
                    classes[1] = 'joined'
                    btn.className = classes.join(' ')

                } else {
                    btn.innerText = 'Delete'
                    
                }

                actionDiv.appendChild(btn)
                notifBox.appendChild(notifText)
                notifBox.appendChild(actionDiv)

                notificationDiv.appendChild(notifBox)

            } else if (notification.type == 'sent') {
                // console.log(notification)

                let notifBox =  document.createElement('div')
                notifBox.classList.add('notification-box', 'private-sent')

                let notifText = document.createElement('p')
                notifText.classList.add('notification-text')
                notifText.innerText = `Sent a private invite to ${notification.receiver}`

                let actionDiv = document.createElement('div')
                actionDiv.classList.add('notification-actions')

                let btn = document.createElement('button')
                btn.classList.add('notification-button', 'decline',`${notification.type}`, `${notification.gameroom}`)

                if (notification.joined == 'true') {
                    
                    btn.innerText = 'Joined'
                    btn.classList[1] = 'joined'
                    classes = btn.className.split(' ')
                    classes[1] = 'joined'
                    btn.className = classes.join(' ')

                } else {
                    btn.innerText = 'Cancel'
                    
                }

                actionDiv.appendChild(btn)
                notifBox.appendChild(notifText)
                notifBox.appendChild(actionDiv)

                notificationDiv.appendChild(notifBox)

            } else if (notification.type == 'received') {
                let notifBox =  document.createElement('div')
                notifBox.classList.add('notification-box', 'private-received')

                let notifText = document.createElement('p')
                notifText.classList.add('notification-text')
                notifText.innerText = `Private invite from ${notification.sender}`

                let actionDiv = document.createElement('div')
                actionDiv.classList.add('notification-actions')

                let btn1 = document.createElement('button')
                btn1.classList.add('notification-button', 'accept', `${notification.type}`, `${notification.gameroom}`)
                btn1.innerText = 'Accept'

                let btn2 = document.createElement('button')
                btn2.classList.add('notification-button', 'decline', `${notification.type}`, `${notification.gameroom}`)
                btn2.innerText = 'Decline'

                actionDiv.appendChild(btn1)
                actionDiv.appendChild(btn2)

                notifBox.appendChild(notifText)
                notifBox.appendChild(actionDiv)

                notificationDiv.appendChild(notifBox)
            }
        })
    }

}

// function to update the player's  score and rank
function updateHightlight(data) {
    let rank = document.querySelector('.rank')
    let score = document.querySelector('.score')

    rank.innerText = `Your Rank: ${data[0].rank}`
    score.innerText = `Total Score: ${data[0].score}`

}

// join the game room of an invite you created
document.querySelector('.notifications-section').addEventListener('click', e => {
    e.preventDefault()
    if (e.target.classList.contains('joined')) {
        
        let gameroom = e.target.classList[3]
        let type = e.target.classList[2]
        type = (type == 'public') ? 'public': 'private'

        let gameData = { 
            gameroom,
            type 
        }

        localStorage.setItem('gameData', JSON.stringify(gameData))
        // let token = localStorage.getItem('token')
        // updateInvite(gameroom, token)
        window.location.href = '/gameroom'

    }

    if (e.target.classList.contains('decline')) {
        
        let gameroom = e.target.classList[3]
        let type = e.target.classList[2]
        type = (type == 'public') ? 'public': 'private'

        let token = localStorage.getItem('token')
        deleteInvite(token, gameroom, type)

    }

    if (e.target.classList.contains('accept')) {

        let gameroom = e.target.classList[3]
        let gameData = { 
            gameroom: gameroom, 
            type: 'private'
            
        }

        localStorage.setItem('gameData', JSON.stringify(gameData))
        updateInvite(gameroom)
        window.location.href = '/gameroom'

    }



})