<template>
  <div class="chat-container">
    <!-- Date Label -->
    <div class="chat-date">
      <span>🕒 <strong>10 December 2024</strong></span>
    </div>

    <!-- Chat Messages -->
    <div class="chat-messages">
      <!-- Loop Through Combined Messages -->
      <div
        v-for="(msg, index) in combinedMessages"
        :key="index"
        :class="['message', msg.sender === 'doctor' ? 'doctor' : 'user']"
      >
        {{ msg.content }}
      </div>

      <!-- Health Metric Card -->
      <div class="health-card">
        <div class="health-card-content">
          <p class="card-title">Heart Rate</p>
          <p class="card-value">120 <span class="unit">bpm</span></p>
        </div>
      </div>

      <!-- Prescription -->
      <div class="prescription-box">
        <p><strong>Mr Brian's Prescription</strong></p>
        <ul>
          <li>Antacids</li>
          <li>Simethicone</li>
        </ul>
      </div>
    </div>

    <!-- Message Input -->
    <div class="chat-input">
      <input type="text" placeholder="Type a message" />
      <button>➤</button>
    </div>
  </div>
</template>

<script setup>
// Combined messages array with sender info
const combinedMessages = [
  { sender: 'doctor', content: 'Good morning, I am Dr Richardson' },
  { sender: 'doctor', content: 'Can I help you?' },
  { sender: 'user', content: 'Hi doctor,' },
  { sender: 'user', content: 'My chest feels very hurt' },
  { sender: 'doctor', content: 'Oh got it' },
  { sender: 'doctor', content: 'Can you share your heart rate?' },
  { sender: 'doctor', content: 'It looks great, seems like you just feel tired' },
  { sender: 'doctor', content: 'I will create some prescription for you' }
]
</script>

<style scoped>
/* Chat Container */
.chat-container {
  font-family: Arial, sans-serif;
  background: #f9f9f9;
  width: 100%;
  margin: 20px auto;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Date */
.chat-date {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-size: 14px;
}

/* Chat Messages */
.chat-messages {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.message {
  padding: 10px 15px;
  border-radius: 15px;
  max-width: 70%;
  font-size: 14px;
  line-height: 1.4;
}

.doctor {
  align-self: flex-start;
  background-color: #7b5dff;
  color: #fff;
}

.user {
  align-self: flex-end;
  background-color: #e5e5e5;
  color: #333;
}

/* Health Card */
.health-card {
  align-self: flex-end;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.health-card-content {
  text-align: left;
}

.card-title {
  font-size: 12px;
  color: #777;
  margin: 0;
}

.card-value {
  font-size: 18px;
  font-weight: bold;
  margin: 5px 0 0;
}

.unit {
  font-size: 14px;
  font-weight: normal;
  color: #777;
}

/* Prescription Box */
.prescription-box {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.prescription-box p {
  margin: 0 0 10px;
  font-weight: bold;
}

.prescription-box ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.prescription-box li {
  padding: 5px 0;
  font-size: 14px;
  color: #333;
}

/* Message Input */
.chat-input {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0 0;
  border-top: 1px solid #ddd;
}

.chat-input input {
  flex: 1;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 14px;
  outline: none;
}

.chat-input button {
  background-color: #7b5dff;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  outline: none;
  transition: background 0.3s;
}

.chat-input button:hover {
  background-color: #5a41cc;
}
</style>
