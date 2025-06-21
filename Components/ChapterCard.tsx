// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
// import React from 'react'
// import { MaterialIcons } from '@expo/vector-icons'
// export default function ChapterCard({ title,descriptions, unlocked, onPress }) {
//   return (
//     <TouchableOpacity 
//       style={[styles.card, !unlocked && styles.locked]} 
//       onPress={onPress}
//       disabled={!unlocked}
//     >
//       <Text style={styles.title}>{title}</Text>
//       <Text style={styles.descriptions}>{descriptions}</Text>
//       <View style={styles.statusContainer}>
//         <Text style={styles.status}>
//           {unlocked ? 'Unlocked' : 'Locked'}
//         </Text>
//         <MaterialIcons 
//           name={unlocked ? 'lock-open' : 'lock'} 
//           size={16}  
//           style={styles.status}
//         />
//       </View>
//     </TouchableOpacity>
//   )
// }
 
// const styles = StyleSheet.create({
//   card: {
//     width: '97%',
//     backgroundColor: '#58e48b',
//     padding: 16,
//     margin: 8,
//     borderRadius: 8,
//     elevation: 2,
//     alignItems: 'center'
//   },
//   locked: {
//     backgroundColor: '#f15355',
//     opacity: 0.7
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 8
//   },
//   descriptions: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 8
//   },
//     statusContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   status: {
//     color: '#f4f4f4',
//     fontSize: 18
//   }
// })
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { ChapterCardProps } from '../types';

export default function ChapterCard({ title, descriptions, unlocked, onPress, percentage = 0 }: ChapterCardProps) {
  const getProgressColor = (percentage) => {
    if (percentage <= 30) return '#e74c3c'; // Red
    if (percentage <= 70) return '#f1c40f'; // Yellow
    return '#2ecc71'; // Green
  };

  return (
    <TouchableOpacity
      style={[styles.card, !unlocked && styles.locked]}
      onPress={onPress}
      disabled={!unlocked}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.descriptions}>{descriptions}</Text>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${percentage}%`,
                backgroundColor: getProgressColor(percentage),
              },
            ]}
          />
        </View>
        <Text style={styles.percentageLabel}>{percentage}%</Text>
      </View>

      <View style={styles.statusContainer}>
        <Text style={styles.status}>
          {unlocked ? 'Unlocked' : 'Locked'}
        </Text>
        <MaterialIcons
          name={unlocked ? 'lock-open' : 'lock'}
          size={16}
          style={styles.status}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '97%',
    backgroundColor: '#58e48b',
    padding: 16,
    margin: 8,
    borderRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  locked: {
    backgroundColor: '#f15355',
    opacity: 0.7,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descriptions: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  status: {
    color: '#f4f4f4',
    fontSize: 18,
    marginLeft: 4,
  },
  progressBarContainer: {
    width: '100%',
    marginTop: 8,
    alignItems: 'center',
  },
  progressBackground: {
    width: '90%',
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
  },
  percentageLabel: {
    marginTop: 4,
    fontSize: 12,
    color: '#444',
  },
});
