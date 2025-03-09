<template>
  <div class="patient-table">
    <h2>Patients</h2>
    <table>
      <thead>
        <tr>
          <th>No.</th>
          <th>Name</th>
          <th>State</th>
          <th>District</th>
          <th>Clinic</th>
          <th>Gender</th>
          <th>Age</th>
          <th>Card</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(patient, index) in patients" :key="index">
          <td>{{ index + 1 }}.</td>
          <td>
            <strong>{{ patient.name }}</strong>
          </td>
          <td>{{ patient.state }}</td>
          <td>{{ patient.district }}</td>
          <td>{{ patient.clinic }}</td>
          <td>{{ patient.gender }}</td>
          <td>{{ patient.age }} yo</td>
          <td>{{ patient.card }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'PatientTable',
  data() {
    return {
      patients: [
        {
          name: 'John Doe',
          state: 'Singapore',
          district: 'Orchard',
          clinic: 'Clinic 1',
          gender: 'Male',
          age: 49,
          card: 'Health Card'
        },
        {
          name: 'Cristiano Ronaldo',
          state: 'Singapore',
          district: 'Orchard',
          clinic: 'Clinic 1',
          gender: 'Male',
          age: 49,
          card: 'Unique ID'
        },
        {
          name: 'Cipto Mangunkusumo',
          state: 'Singapore',
          district: 'Bukit Baru',
          clinic: 'Clinic 1',
          gender: 'Male',
          age: 49,
          card: 'Health Card'
        },
        {
          name: 'Carolus',
          state: 'Jakarta',
          district: 'Salemba',
          clinic: 'Clinic 1',
          gender: 'Male',
          age: 49,
          card: 'Health Card'
        },
        {
          name: 'Jendral Soedirman',
          state: 'Singapore',
          district: 'Orchard',
          clinic: 'Clinic 1',
          gender: 'Male',
          age: 49,
          card: 'Health Card'
        },
        {
          name: 'Luvia',
          state: 'Singapore',
          district: 'Geylang',
          clinic: 'Clinic 1',
          gender: 'Male',
          age: 49,
          card: 'Health Card'
        },
        {
          name: 'Clinic Quezon',
          state: 'Manila',
          district: 'Quezon',
          clinic: 'Clinic 1',
          gender: 'Male',
          age: 49,
          card: 'Health Card'
        },
        {
          name: 'Praboewo Subiantoro',
          state: 'Jakarta',
          district: 'Cibubur',
          clinic: 'Clinic 1',
          gender: 'Male',
          age: 49,
          card: 'Health Card'
        },
        {
          name: 'Brayen Binar Putra',
          state: 'Jakarta',
          district: 'Kuningan',
          clinic: 'Clinic 1',
          gender: 'Male',
          age: 49,
          card: 'Health Card'
        },
        {
          name: 'Li Kuan Young',
          state: 'Singapore',
          district: 'Bukit baru',
          clinic: 'Clinic 1',
          gender: 'Male',
          age: 49,
          card: 'Health Card'
        }
      ]
    }
  }
}
</script>

<style scoped>
.patient-table {
  margin-top: 20px;
  font-family: Arial, sans-serif;
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  padding-bottom: 24px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  font-weight: normal;
  margin-bottom: 16px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px 12px;
  text-align: left;
}

th {
  font-weight: normal;
  color: #666;
}

td strong {
  font-weight: bold;
}

tr:not(:last-child) {
  border-bottom: 1px solid #ddd;
}
</style>
