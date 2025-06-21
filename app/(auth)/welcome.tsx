import ScreenWrapper from '../../Components/ScreenWrapper'
import React from 'react'
import { StyleSheet, Image, TouchableOpacity, View} from 'react-native'
import Typography from '../../Components/Typography'
import { colors, spacingX, spacingY } from '../../Constants/Theme'
import { verticalScale } from 'react-native-size-matters'
import CustomButton from '../../Components/CustomButton'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { useRouter } from 'expo-router'
import CustomButton2 from '../../Components/CustomButton2'

const welcome = () => {
  const router = useRouter();
  return (
    <ScreenWrapper>
      <View>
        
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
              fontWeight={'800'}>Welcome to Expense</Typography>

            <Typography
              size={24}
              fontWeight={'800'}>Tracker</Typography>
            </Animated.View>

            <Animated.View 
              entering={FadeInDown.duration(1000).delay(500)}
              style={{ alignItems: 'center' }}>
            <Typography
              size={16}
              color={colors.textSecondary}
              style={{ alignSelf: 'center'}}
            >
              Track your expenses and manage
            </Typography>
            
            <Typography
              size={16}
              color={colors.textSecondary}
              style={{ alignSelf: 'center'}}
            >
              your budget effectively.
            </Typography>

          </Animated.View>
          <Animated.View 
            entering={FadeInDown.duration(1000).delay(1000)}
            style={styles.buttonContainer}>
            <CustomButton2
              onPress={() => router.push('/(auth)/welcome2')}>
              <Typography
                size={16}
                fontWeight={'600'}
                color={colors.neutral90}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: spacingY.sm,
  },
  welcomeImage: {
    width: '100%',
    height: verticalScale(300),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: verticalScale(70),
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
}
);