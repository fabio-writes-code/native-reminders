import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Platform,
  StatusBar,
  Alert
} from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

export default function App() {
  const [reminderText, setReminderText] = useState('')
  const [reminders, setReminders] = useState([])
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')

  const handleReminderTextChange = (text) => {
    setReminderText(text)
  }

  const handleAddReminder = () => {
    if (!reminderText.trim()) {
      Alert.alert('Please enter a reminder text')
      return
    }
    if (!selectedDate) {
      Alert.alert('Please select a date and time')
      return
    }
    const newReminder = {
      id: Math.random().toString(),
      text: reminderText,
      date: selectedDate,
      isComplete: false
    }
    setReminders([...reminders, newReminder])
    setReminderText('')
    setSelectedDate('')
  }

  const handleDeleteReminder = (id) => {
    Alert.alert(
      'Delete Reminder',
      'Are you sure you want to delete this reminder?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedReminders = reminders.filter(
              (reminder) => reminder.id !== id
            )
            setReminders(updatedReminders)
          }
        }
      ]
    )
  }

  const handleCompleteReminder = (id) => {
    const updatedReminders = reminders.map((reminder) => {
      if (reminder.id === id) {
        return { ...reminder, isComplete: true }
      }
      return reminder
    })
    setReminders(updatedReminders)
  }

  const handleDateConfirm = (date) => {
    setSelectedDate(date.toLocaleString())
    setDatePickerVisibility(false)
  }

  const handleDateCancel = () => {
    setDatePickerVisibility(false)
  }

  const renderReminder = ({ item }) => (
    <View style={styles.reminder}>
      <Text style={styles.reminderText}>{item.text}</Text>
      <Text style={styles.reminderDate}>{item.date}</Text>
      {!item.isComplete && (
        <Button
          title="Complete"
          onPress={() => handleCompleteReminder(item.id)}
        />
      )}
      <Button title="Delete" onPress={() => handleDeleteReminder(item.id)} />
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reminders</Text>
      <View style={styles.form}>
        <View style={styles.inputForm}>
          <Text>Title:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter reminder text"
            value={reminderText}
            onChangeText={handleReminderTextChange}
          />
        </View>
        <View style={styles.inputForm}>
          <Button
            style={styles.button}
            title="Select Date"
            onPress={() => setDatePickerVisibility(true)}
          />
          <Text style={styles.textBlock}>
            {selectedDate ? `${selectedDate}` : 'No date selected'}
          </Text>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleDateConfirm}
          onCancel={handleDateCancel}
        />
        <Button title=" Add Reminder" onPress={handleAddReminder} />
      </View>
      <FlatList
        data={reminders}
        renderItem={renderReminder}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    width: '100%',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  inputForm: {
    marginBottom: 20,
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    width: '100%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  button: {
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10
  },
  textBlock: {
    marginBottom: 10,
    marginTop: 10
  },
  form: {
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '100%'
  },
  reminder: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    width: '100%'
  },
  reminderText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  reminderDate: {
    fontSize: 14,
    marginBottom: 5
  }
})
