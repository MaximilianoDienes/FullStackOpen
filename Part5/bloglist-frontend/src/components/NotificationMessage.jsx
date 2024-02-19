import React from 'react'
import { useSelector } from 'react-redux'

const NotificationMessage = () => {
  const { notificationMessage, notificationType } = useSelector(
    (state) => state.notification,
  )

  if (notificationType === null || notificationMessage === null) {
    return
  } else
    return (
      <div className={notificationType} id="notification">
        <p>{notificationMessage}</p>
      </div>
    )
}

export default NotificationMessage
