import React from 'react'
import { StyleSheet, Image, View } from 'react-native'
import Typography from '../../Components/Typography'
import { colors, spacingX, spacingY } from '../../Constants/Theme'
import { verticalScale } from 'react-native-size-matters'
import CustomButton from '../../Components/CustomButton'
import Animated, { FadeInDown } from 'react-native-reanimated'
import ScreenWrapper from '../../Components/ScreenWrapper'
import { useRouter } from 'expo-router'
import CustomButton2 from '../../Components/CustomButton2'

const ChooseAuth = () => {
    const router = useRouter();
  return (
    <ScreenWrapper>
      <View style={{ flex: 1, justifyContent: 'flex-end'}}>
        <Image
          source={require('../../assets/images/welcome.png')}
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
              color={colors.text}
              style={{ marginBottom: spacingY.sm }}
            >
              Welcome!
            </Typography>
            <Typography
              size={16}
              color={colors.textSecondary}
              style={{ alignSelf: 'center', marginTop: spacingY.xs }}
            >
              Please choose an option to continue
            </Typography>
          </Animated.View>

            <View style={styles.buttonContainer}>
                <Animated.View
                    entering={FadeInDown.duration(800).delay(500)}>
                    <CustomButton2
                    style={{ marginBottom: spacingY.sm }}
                    onPress={() => router.push('/(auth)/login')}
                    >
                    <Typography
                        size={16}
                        fontWeight={'600'}
                        color={colors.neutral90}
                    >
                        Log In
                    </Typography>
                    </CustomButton2>
                </Animated.View>
                <Animated.View
                    entering={FadeInDown.duration(800).delay(700)}>
                    <CustomButton2
                    onPress={() => router.push('/(auth)/register')}
                    >
                    <Typography
                        size={16}
                        fontWeight={'600'}
                        color={colors.primary100}
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
    backgroundColor: colors.neutral80,
    alignItems: 'center',
    paddingTop: verticalScale(30),
    paddingBottom: verticalScale(30),
    gap: spacingY.sm,
    borderRadius: 30,
    marginHorizontal: spacingX.sm,
    marginBottom: spacingY.lg,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: spacingX.md,
    marginTop: spacingY.md,
  },
})