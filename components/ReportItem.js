import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../actions/newIncident'

class ReportItem extends React.Component {
  render() {
    const { title, type } = this.props
    const empty = <View style={{ flex: 1 }} />

    let imageSrc
    switch (type) {
      case '화재':
        imageSrc = require('../assets/images/incidentSend/fire.png')
        break
      case '가스':
        imageSrc = require('../assets/images/incidentSend/gas.png')
        break
      case '화학물질 누출':
        imageSrc = require('../assets/images/incidentSend/flask.png')
        break
      case '생물학적 유해물질 누출':
        imageSrc = require('../assets/images/incidentSend/biohazard.png')
        break
      case '방사선':
        imageSrc = require('../assets/images/incidentSend/radiation.png')
        break
      case '지진':
        imageSrc = require('../assets/images/incidentSend/earthquake.png')
        break
      case '엘레베이터 사고':
        imageSrc = require('../assets/images/incidentSend/lift.png')
        break
      case '정전':
        imageSrc = require('../assets/images/incidentSend/antistatic.png')
        break
    }
    const image = (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Image source={imageSrc} />
      </View>
    )

    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.itemContainer}>
          {image}
          <Text style={styles.itemContent}>{title}</Text>
          {empty}
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = {
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 60,
    borderWidth: 1,
    borderColor: '#adadad',
    borderRadius: 5,
    marginBottom: 10,
  },
  itemContent: {
    color: '#4f4f4f',
    flex: 4,
    fontWeight: 'bold',
    fontSize: 16,
  },
}

const mapStateToProps = (state, ownProps) => ({
  selected: state.newIncident.selectedIncident === ownProps.type,
})

export default connect(
  mapStateToProps,
  actions
)(ReportItem)
