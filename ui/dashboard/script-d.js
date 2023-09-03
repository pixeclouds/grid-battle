

function updateNotiticationUI(notifications) {
    let notificationDiv = document.querySelector('.notifications-section')

    if (notifications.length == 0) {
        // display no notifications message
        document.querySelector('no-invites-message-box').style.display = 'block'
    } else {
        notificationDiv.innerHTML = ''
        notifications.forEach(notification => {
            if (notification.type == 'public') {
                let notifBox =  document.createElement('div')
                notifBox.classList.add('notification-box', 'public-created')

                let notifText = document.createElement('p')
                notifText.classList.add('notification-text')
                notifText.innerText ='You created a public Invite'

                let actionDiv = document.createElement('div')
                actionDiv.classList.add('notification-actions')

                let btn = document.createElement('button')
                btn.classList.add('notification-button', 'decline')
                btn.innerText = 'Delete'

                actionDiv.appendChild(btn)
                notifBox.appendChild(notifText)
                notifBox.appendChild(actionDiv)

                notificationDiv.appendChild(notifBox)

            } else if (notification.type == 'sent') {
                let notifBox =  document.createElement('div')
                notifBox.classList.add('notification-box', 'private-sent')

                let notifText = document.createElement('p')
                notifText.classList.add('notification-text')
                notifText.innerText = `Sent a private invite to ${notification.invited}`

                let actionDiv = document.createElement('div')
                actionDiv.classList.add('notification-actions')

                let btn = document.createElement('button')
                btn.classList.add('notification-button', 'decline')
                btn.innerText = 'Cancel'

                actionDiv.appendChild(btn)
                notifBox.appendChild(notifText)
                notifBox.appendChild(actionDiv)

                notificationDiv.appendChild(notifBox)

            } else if (notification.type == 'received') {
                let notifBox =  document.createElement('div')
                notifBox.classList.add('notification-box', 'private-received')

                let notifText = document.createElement('p')
                notifText.classList.add('notification-text')
                notifText.innerText = `Private invite from ${notification.invitee}`

                let actionDiv = document.createElement('div')
                actionDiv.classList.add('notification-actions')

                let btn1 = document.createElement('button')
                btn1.classList.add('notification-button', 'accept')
                btn1.innerText = 'Accept'

                let btn2 = document.createElement('button')
                btn2.classList.add('notification-button', 'decline')
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