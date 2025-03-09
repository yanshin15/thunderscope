// notificationStore.js
import { reactive, watch } from 'vue'

const storageKey = 'app_notifications'

// Load notifications from localStorage
const loadNotifications = () => {
  const savedNotifications = localStorage.getItem(storageKey)
  return savedNotifications ? JSON.parse(savedNotifications) : []
}

// Reactive state for notifications
const notificationState = reactive({
  notifications: loadNotifications()
})

// Function to add a new notification
const addNotification = (type, data) => {
  const notification = {
    id: Date.now(), // Unique ID
    type, // Notification type
    time: `${data.date} at ${data.time}`, // Format date and time
    ...data // Additional fields based on type
  }
  notificationState.notifications.push(notification)
}

// Function to clear all notifications
const clearNotifications = () => {
  notificationState.notifications.length = 0 // Clear the array without replacing it
  localStorage.removeItem(storageKey) // Clear localStorage
}

// Watch notifications and save to localStorage whenever they change
watch(
  () => notificationState.notifications,
  newNotifications => {
    localStorage.setItem(storageKey, JSON.stringify(newNotifications))
  },
  { deep: true } // Ensure nested changes are detected
)

export { notificationState, addNotification, clearNotifications }
