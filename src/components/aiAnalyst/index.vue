<template>
  <div class="ai-analyst-page">
    <!-- Header Section -->
    <div class="header-section">
      <div class="headerleft">
        <div class="icon-container">
          <el-icon><StarFilled /></el-icon>
        </div>
        <h2 class="summary-title">AI Analyst Summary</h2>
      </div>
      <button class="chat-history-btn">View Chat History</button>
    </div>

    <!-- Info Message -->
    <div class="info-message">This is for informational purposes only. Doctor needs to do research & validation</div>

    <!-- Report Section -->
    <div class="report-section">
      <h3 class="report-title">Complaints & Medical Report Analyst.</h3>
      <p>
        The symptoms listed are consistent with <strong>malaria</strong>, particularly in moderate to severe cases.
        Malaria commonly presents with:
      </p>
      <ul class="symptom-list">
        <li><strong>Fever, chills, and sweating in cycles.</strong></li>
        <li><strong>Headaches, muscle and joint pain.</strong></li>
        <li><strong>Fatigue, weakness, and dizziness due to anemia.</strong></li>
        <li><strong>Gastrointestinal symptoms like nausea, vomiting, diarrhea, and abdominal pain.</strong></li>
        <li><strong>Dark-colored urine, which can indicate hemolysis (destruction of red blood cells).</strong></li>
        <li>
          <strong>In severe cases, confusion, difficulty breathing, and neurological symptoms may occur.</strong>
        </li>
      </ul>
      <p class="report-note">
        Malaria can be deadly if not diagnosed and treated quickly. Symptoms can be similar to a cold or flu, so it can
        be hard to tell what you have at first. If you think you may have gotten malaria while traveling in an area
        where it's common, go see a doctor as soon as possible.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { StarFilled } from '@element-plus/icons-vue'
</script>

<style scoped>
.ai-analyst-page {
  padding: 20px;
  background-color: #f9fafb;
}

/* Header Section */
.header-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* background-color: white; */
  border-radius: 8px;
  padding: 16px;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
}

.icon-container {
  background-color: #00c1ff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.summary-title {
  font-size: 18px;
  font-weight: bold;
  margin: 0;
}

.chat-history-btn {
  background-color: #4c59f7;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
}

.chat-history-btn:hover {
  background-color: #3649d4;
}

/* Info Message */
.info-message {
  background-color: #f4f5f7;
  color: #333;
  font-size: 14px;
  padding: 10px;
  border-radius: 8px;
  margin: 20px 0;
}

/* Report Section */
.report-section {
  background-color: #f4f5f7;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.report-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 12px;
}

.symptom-list {
  padding-left: 20px;
  line-height: 1.8;
}

.symptom-list li {
  margin-bottom: 8px;
}

.report-note {
  margin-top: 30px;
  font-size: 14px;
  color: #555;
  line-height: 1.6;
}

.headerleft {
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>
