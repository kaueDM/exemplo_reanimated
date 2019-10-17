import React from 'react'
import { timing } from 'react-native-redash'
import Animated from 'react-native-reanimated'
import { Dimensions, TouchableOpacity, Text } from 'react-native'

const {
  Value,
  View,
  ScrollView,
  interpolate,
  add,
  sub,
  multiply,
  ceil,
  divide,
  useCode,
  cond,
  eq,
  set
} = Animated

const { width: screenWidth } = Dimensions.get('window')

const CARD_PADDING = 50
const CARD_WIDTH = screenWidth - (CARD_PADDING * 2)

const Carousel: React.FC<{}> = () => {
  const offsetX = new Value(0)
  const carouselOpacity = new Value(1)
  const animationState = new Value(1)

  useCode(set(carouselOpacity, timing({
    from: carouselOpacity,
    to: animationState,
    duration: 400
  })), [animationState])

  const toggle = () => {
    return animationState.setValue(cond(eq(animationState, 0), 1))
  }

  return (
    <React.Fragment>
      <ScrollView
        horizontal
        snapToAlignment='right'
        decelerationRate='fast'
        snapToInterval={CARD_WIDTH}
        style={{ paddingVertical: 50, opacity: carouselOpacity }}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: CARD_PADDING }}
        scrollEventThrottle={1}
        onScroll={Animated.event([{
          nativeEvent: {
            contentOffset: {
              x: offsetX
            }
          }
        }])}
      >
        {Array.from({ length: 10 }).map((card, index) => (
          <View
            key={index}
            style={{
              flex: 1,
              width: CARD_WIDTH,
              borderWidth: 1,
              borderColor: 'red',
              backgroundColor: 'lightgreen',
              transform: [{
                scale: interpolate(offsetX, {
                  inputRange: [
                    multiply(sub(index, 1), CARD_WIDTH),
                    multiply(index, CARD_WIDTH),
                    multiply(add(index, 1), CARD_WIDTH)
                  ],
                  outputRange: [0.9, 1, 0.9]
                })
              }],
              opacity: interpolate(offsetX, {
                inputRange: [
                  multiply(sub(index, 1), CARD_WIDTH),
                  multiply(index, CARD_WIDTH),
                  multiply(add(index, 1), CARD_WIDTH)
                ],
                outputRange: [0.5, 1, 0.5]
              })
            }}
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        onPress={toggle}
        style={{
          paddingVertical: 20,
          paddingHorizontal: 30,
          position: 'absolute',
          bottom: 100,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'orangered'
        }}
      >
        <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>
          Toggle
        </Text>
      </TouchableOpacity>
    </React.Fragment>
  )
}

export default Carousel
