import ScreenWrapper from '../../Components/ScreenWrapper'
import React from 'react'
import { StyleSheet, Image, TouchableOpacity, View} from 'react-native'
import Typography from '../../Components/Typography'
import { colors, spacingX, spacingY } from '../../Constants/Theme'
import { verticalScale } from 'react-native-size-matters'
import CustomButton from '../../Components/CustomButton'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated'
import { useRouter } from 'expo-router'
import CustomButton2 from '../../Components/CustomButton2'
import { LinearGradient } from 'expo-linear-gradient';

const welcome = () => {
  const router = useRouter();
  return (
    <ScreenWrapper>
      <LinearGradient
        colors={['#FFF4E0', '#FFE5B4']}
        style={StyleSheet.absoluteFill}
      />
      <View>
        
        <Animated.Image
          entering={FadeInUp.duration(1000)}
          source={require('../../assets/images/welcomePage.png')}
          style={styles.welcomeImage}
          resizeMode='contain'
        />

        <View style={styles.footer}>
          <Animated.View
            entering={FadeInDown.duration(1000)}
           style={{ alignItems: 'center' }}>
            <Typography
              size={24}
              fontWeight={'800'}
              color={accentColor}
              >
              Welcome to Vocabulary
            </Typography>

            <Typography
              size={24}
              fontWeight={'800'}
              color={accentColor}
              >
                App
            </Typography>
            </Animated.View>

            <Animated.View 
              entering={FadeInDown.duration(1000).delay(500)}
              style={{ alignItems: 'center' }}>
            <Typography
              size={16}
              color={secondaryText}
              style={{ alignSelf: 'center'}}
            >
              Learn new words, take quizzes,
            </Typography>
            
            <Typography
              size={16}
              color={secondaryText}
              style={{ alignSelf: 'center'}}
            >
              and boost your vocabulary
            </Typography>

          </Animated.View>
          <Animated.View 
            entering={FadeInDown.duration(1000).delay(1000)}
            style={styles.buttonContainer}>
            <CustomButton2
              onPress={() => router.push('/(auth)/welcome2')}
              style={styles.getStartedButton}
            >
              <Typography
                size={16}
                fontWeight={'600'}
                color="#fff"
              >
                Get Started
              </Typography>
            </CustomButton2>
          </Animated.View>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default welcome;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'space-between',
//     paddingTop: spacingY.sm,
//   },
//   welcomeImage: {
//     width: '100%',
//     height: verticalScale(300),
//     resizeMode: 'contain',
//     alignSelf: 'center',
//     marginTop: verticalScale(70),
//   },
//   footer: {
//     backgroundColor: "#fff",//here
//     alignItems: 'center',
//     paddingTop: verticalScale(30),
//     paddingBottom: verticalScale(30),
//     gap: spacingY.sm,
//     borderRadius: 30,
//     marginHorizontal: spacingX.sm,
//     marginBottom: spacingY.lg,
//   },
//   buttonContainer: {
//     width: '100%',
//     paddingHorizontal: spacingX.md,
//     marginTop: spacingY.md,
//   },
// }
// );
const accentColor = '#FF9900';
const secondaryText = '#B8860B'; // a soft brownish-orange for secondary text

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: spacingY.sm,
    backgroundColor: 'transparent', // gradient will show through
  },
  welcomeImage: {
    width: '100%',
    height: verticalScale(300),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: verticalScale(40),
    marginBottom: verticalScale(10),
  },
  footer: {
    backgroundColor: 'rgba(255, 244, 224, 0.96)',
    alignItems: 'center',
    paddingTop: verticalScale(40),
    paddingBottom: verticalScale(40),
    gap: spacingY.sm,
    borderRadius: 36,
    marginHorizontal: spacingX.sm,
    marginBottom: spacingY.lg,
    borderWidth: 1.5,
    borderColor: '#FFD59E',
    shadowColor: '#FF9900',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.13,
    shadowRadius: 24,
    elevation: 10,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: spacingX.md,
    marginTop: spacingY.md,
  },
  getStartedButton: {
  backgroundColor: '#FF9900', // Vibrant orange
  borderRadius: 28,
  paddingVertical: 14,
  paddingHorizontal: 36,
  alignItems: 'center',
  shadowColor: '#FF9900',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.18,
  shadowRadius: 8,
  elevation: 4,
  },
});