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
    width: '95%',
    backgroundColor: '#58e48b',
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginVertical: 10,
    borderRadius: 12,
    elevation: 3,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  locked: {
    backgroundColor: '#f15355',
    opacity: 0.6,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  descriptions: {
    fontSize: 15,
    color: '#f0f0f0',
    marginBottom: 12,
    textAlign: 'left',
  },
  progressBarContainer: {
    width: '100%',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  progressBackground: {
    width: '100%',
    height: 10,
    backgroundColor: '#dcdcdc',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
  },
  percentageLabel: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  status: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 4,
  },
});

