import React from 'react'
import { StyleSheet, Image, View } from 'react-native'
import Typography from '../../Components/Typography'
import { colors, spacingX, spacingY } from '../../Constants/Theme'
import { verticalScale } from 'react-native-size-matters'
import CustomButton from '../../Components/CustomButton'
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated'
import ScreenWrapper from '../../Components/ScreenWrapper'
import { useRouter } from 'expo-router'
import CustomButton2 from '../../Components/CustomButton2'
import { LinearGradient } from 'expo-linear-gradient'

const ChooseAuth = () => {
    const router = useRouter();
  return (
    <ScreenWrapper>
      <LinearGradient
        colors={['#FFF4E0', '#FFE5B4']}
        style={StyleSheet.absoluteFill}
      />
      <View style={{ flex: 1, justifyContent: 'flex-end'}}>
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
              style={{ marginBottom: spacingY.sm }}
            >
              Welcome!
            </Typography>
            <Typography
              size={16}
              color={secondaryText}
              style={{ alignSelf: 'center', marginTop: spacingY.xs }}
            >
              Please choose an option to continue
            </Typography>
          </Animated.View>

            <View style={styles.buttonContainer}>
                <Animated.View
                    entering={FadeInDown.duration(800).delay(500)}>
                    <CustomButton2
                    style = {styles.authButton }
                    onPress={() => router.push('login')}
                    >
                    <Typography
                      size={16}
                      fontWeight={'600'}
                      color="#fff"
                    >
                        Log In
                    </Typography>
                    </CustomButton2>
                </Animated.View>
                <Animated.View
                    entering={FadeInDown.duration(800).delay(700)}>
                    <CustomButton2
                    onPress={() => router.push('register')}
                    style = {styles.authButton }
                    >
                    <Typography
                      size={16}
                      fontWeight={'600'}
                      color="#fff"
                    >
                        Sign Up
                    </Typography>
                    </CustomButton2>
                </Animated.View>
            </View>
          
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default ChooseAuth

const styles = StyleSheet.create({
  welcomeImage: {
    width: '100%',
    height: verticalScale(250),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: verticalScale(50),
  },
  footer: {
    backgroundColor: 'rgba(255, 244, 224, 0.96)',
    alignItems: 'center',
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(20),
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
  authButton: {
  backgroundColor: '#FF9900', // Vibrant orange
  borderRadius: 28,
  paddingVertical: 14,
  paddingHorizontal: 36,
  marginVertical: spacingY.xs,
  alignItems: 'center',
  shadowColor: '#FF9900',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.18,
  shadowRadius: 8,
  elevation: 4,
  },
});
const accentColor = '#FF9900';
const secondaryText = '#B8860B';