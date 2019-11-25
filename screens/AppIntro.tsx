import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import AppIntroSlider from 'react-native-app-intro-slider'

const slides = [
  {
    key: 'somethun',
    text: 'KAIST에서 발생한 안전 사고를 한 눈에 확인하세요.',
    icon: 'ios-images',
    color: '#65AEFE',
  },
  {
    key: 'somethun1',
    text: '안전 사고를 빠르게 제보하고 사람들에게 알리세요.',
    icon: 'ios-images',
    color: '#65AEFE',
  },
  {
    key: 'somethun2',
    text: '사고 처리 과정을 확인하세요. 중요한 정보를 모두와 공유하세요.',
    icon: 'ios-images',
    color: '#65AEFE',
  },
  {
    key: 'somethun3',
    text: '훈련 모드에서 사용법을 익혀보세요. 실제 제보와 구분하여 처리합니다.',
    icon: 'ios-images',
    color: '#65AEFE',
  },
]

interface Props {
  onDone(): void
}

export default class AppIntroScreen extends Component<Props> {
  _renderItem = ({ item }) => {
    return (
      <View style={styles.mainContent}>
        <View style={{ flex: 1 }}>
          <Text style={styles.text}>{item.text}</Text>
        </View>
        <Ionicons
          style={{ flex: 1, backgroundColor: 'transparent' }}
          name={item.icon}
          size={200}
          color="white"
        />
        <View style={{ flex: 1 }} />
      </View>
    )
  }

  render() {
    return (
      <AppIntroSlider
        renderItem={this._renderItem}
        // renderNextButton={this._renderNext}
        slides={slides}
        onDone={this.props.onDone}
        buttonStyle={{ backgroundColor: 'transparent' }}
        nextLabel={'다음'}
        buttonTextStyle={{ fontWeight: 'bold' }}
        doneLabel={'KAIREN 사용 시작하기'}
        bottomButton
      />
    )
  }
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: '#65AEFE',
    paddingVertical: 100,
  },
  image: {
    width: 320,
    height: 320,
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 80,
  },
  title: {
    fontSize: 22,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  },
})
