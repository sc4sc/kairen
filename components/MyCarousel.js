import React, { Component } from 'react'
import { View } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import IncidentCard from './IncidentCard'
import Layout from '../constants/Layout'

export default class MyCarousel extends Component {
  state = { activeSlide: 0 }

  _renderItem({ item: incident }) {
    return (
      <IncidentCard
        data={incident}
        onPress={() =>
          this.props.navigation.navigate('IncidentDetail', {
            incidentDetail: incident,
          })
        }
      />
    )
  }

  get pagination() {
    const { entries } = this.props
    const { activeSlide } = this.state
    return (
      <Pagination
        pointerEvents="none"
        dotsLength={entries.length}
        activeDotIndex={activeSlide}
        containerStyle={{
          paddingVertical: 0,
          paddingHorizontal: 0,
          marginBottom: 15,
        }}
        dotStyle={{ width: 20 }}
        inactiveDotStyle={{ width: 7 }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    )
  }

  render() {
    return (
      <View>
        {this.pagination}
        <Carousel
          ref={el => (this.carousel = el)}
          data={this.props.entries}
          keyExtractor={item => `${item.id}`}
          renderItem={this._renderItem}
          onSnapToItem={index => this.setState({ activeSlide: index })}
          onBeforeSnapToItem={this.props.handleSnapToItem}
          sliderWidth={Layout.window.width}
          itemWidth={Layout.window.width - 50}
          containerCustomStyle={{ height: 200, overflow: 'visible' }}
          slideStyle={{ paddingLeft: 5, paddingRight: 5 }}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
        />
      </View>
    )
  }
}
