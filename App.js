import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Image, Text } from 'react-native';

export default function App() {

  const loopAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    Animated.loop(
      Animated.timing(loopAnimation, {
        toValue: 1,
        duration: 7000, 
        useNativeDriver: true, 
        easing: Easing.inOut(Easing.ease), 
      })
    ).start();
  }, [loopAnimation]);

  const scale = loopAnimation.interpolate({
    inputRange: [0, 0.5, 1], 
    outputRange: [1, 1.08, 1], 
  });


  const rotate = loopAnimation.interpolate({
    inputRange: [0, 0.25, 0.75, 1], // Fatias do ciclo
    outputRange: ['0deg', '5deg', '-5deg', '0deg'], 
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MV/Design</Text>
      <Animated.View
        style={[
          styles.avatarShadow,
          {
            transform: [
              { scale: scale },
              { rotate: rotate },
            ],
          },
        ]}>
      <Image
        source={require('./meu-avatar.png')} 
        style={styles.avatar}
      />
    </Animated.View>
  </View>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F5F7', 
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 80,
    fontFamily: 'System', 
  },
  avatarShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 15,
    elevation: 8, 
    borderRadius: 75,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75, 
    borderWidth: 5,
    borderColor: '#FFFFFF', 
  },
});
