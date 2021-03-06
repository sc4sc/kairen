import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { FlatList } from 'react-native-gesture-handler'
import StateMarker from '../components/StateMarker'
import CommentCard from '../components/CommentCard'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import NaverMap from '../components/NaverMap'
import { getBottomSpace, formatDate } from '../utils'
import Colors from '../constants/Colors'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import Layout from '../constants/Layout'
import ProgressCard from '../components/ProgressCard'
import { Platform } from '@unimodules/core'
import i18n from '../i18n'
import { Image } from 'react-native-elements'
import { sampleComments } from '../constants/SampleIncidents'

const statusBarHeight = getStatusBarHeight()

export default class IncidentDetailSample extends React.Component {
  constructor() {
    super()
    this.state = {
      headerBackToggle: false,
      commentList: sampleComments,
      recentProgress: [],
    }
  }

  componentWillMount() {}

  renderHeader() {
    return (
      <View>
        <Text style={{ color: Colors.dateLightGrey }}>
          April 1, 2019 8:58 PM
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 28,
              color: Colors.defaultBlack,
            }}>
            {i18n.t('sample')}
          </Text>
        </View>
        <Text style={{ color: Colors.defaultBlack }}>N10 교양분관</Text>
      </View>
    )
  }

  renderCallToInformant() {
    return (
      <View style={[styles.information, { backgroundColor: '#44aa25' }]}>
        <View>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
            전화하기
          </Text>
          <Text style={{ fontSize: 10, color: 'white' }}>이름과 전화번호</Text>
        </View>
        <TouchableOpacity
          style={[styles.informationButton, { backgroundColor: '#27820d' }]}>
          <Text>이미지</Text>
        </TouchableOpacity>
      </View>
    )
  }

  renderProtocol() {
    return (
      <View style={[styles.information, { backgroundColor: '#ff9412' }]}>
        <View>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
            {i18n.t('safety_instructions')}
          </Text>
          <Text style={{ color: 'white' }}>{i18n.t('code_of_conduct')}</Text>
        </View>
        <TouchableOpacity
          style={[styles.informationButton, { backgroundColor: '#db7d0a' }]}>
          <Image source={require('../assets/images/right-arrow.png')} />
        </TouchableOpacity>
      </View>
    )
  }

  renderStatusBar() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.subheaderText}>{i18n.t('progress_status')}</Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
          <StateMarker position="left">{i18n.t('확인중')}</StateMarker>
          <StateMarker position="center">{i18n.t('처리중')}</StateMarker>
          <StateMarker position="right" selected={true}>
            {i18n.t('완료')}
          </StateMarker>
        </View>
      </View>
    )
  }

  renderProgress() {
    const progress = [
      {
        content: i18n.t('sample_content'),
        createdAt: '2019-04-01T15:32',
      },
    ]

    const recentView = (
      <ProgressCard
        author="안전팀"
        date={formatDate(progress[0].createdAt)}
        propStyle={styles.progressBox}>
        {progress[0].content}
      </ProgressCard>
    )

    return (
      <View>
        <View
          style={[
            styles.subheaderContainer,
            { flexDirection: 'row', justifyContent: 'space-between' },
          ]}>
          <Text style={styles.subheaderText}>Progress</Text>
        </View>
        {recentView}
      </View>
    )
  }

  renderComment(data) {
    const {
      id,
      User: { ku_kname },
      like,
      content,
      createdAt,
      updatedAt,
      totalLike,
      commentIndex,
      reply,
    } = data.item
    const commentDate = formatDate(createdAt)
    const replyDate = formatDate(updatedAt)

    return (
      <CommentCard
        commentId={id}
        author={ku_kname}
        like={like}
        totalLike={totalLike}
        date={commentDate}
        replyDate={replyDate}
        index={commentIndex}
        reply={reply}
        clickable={false}
        onPressReply={false}>
        {content}
      </CommentCard>
    )
  }

  checkHeaderOpacity = event => {
    if (
      event.nativeEvent.contentOffset.y >=
      Layout.window.width - (statusBarHeight + 55)
    ) {
      this.setState({
        headerBackToggle: true,
      })
    } else {
      this.setState({
        headerBackToggle: false,
      })
    }
  }

  render() {
    const keyExtractor = item => item.id.toString()

    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
        <SafeAreaView
          style={[
            styles.headerBack,
            {
              backgroundColor: this.state.headerBackToggle
                ? 'white'
                : 'rgba(0,0,0,0)',
              borderColor: this.state.headerBackToggle
                ? 'rgba(0,0,0,0.1)'
                : 'rgba(0,0,0,0)',
            },
          ]}>
          <TouchableOpacity
            style={styles.backWard}
            onPress={() => {
              this.props.navigation.goBack()
            }}>
            <Image source={require('../assets/images/back.png')} />
            <Text style={{ marginLeft: 5, fontSize: 18, fontWeight: '800' }}>
              {i18n.t('incident_list')}
            </Text>
          </TouchableOpacity>
        </SafeAreaView>

        <KeyboardAwareScrollView
          onScroll={this.checkHeaderOpacity}
          contentContainerStyle={styles.scrollingContainer}
          enableOnAndroid
          enableAutomaticScroll
          extraScrollHeight={Platform.OS === 'android' ? 100 : 0}
          keyboardShouldPersistTaps="handled"
          bounces={false}>
          <NaverMap draggable={false} style={styles.map} markers={[{}]} />
          <View
            style={{
              backgroundColor: '#ffffff',
              marginTop: -30,
              paddingVertical: 18,
              paddingHorizontal: 15,
            }}>
            {this.renderHeader()}
            <View style={{ height: 28 }} />
            {this.renderProtocol()}
            <View style={{ height: 24 }} />
            {this.renderStatusBar()}
            <View style={{ height: 24 }} />
            {this.renderProgress()}
            <View style={{ height: 24 }} />
            <Text style={[styles.subheaderContainer, styles.subheaderText]}>
              Comment
            </Text>
            <FlatList
              data={this.state.commentList}
              keyExtractor={keyExtractor}
              renderItem={this.renderComment}
            />

            <Text style={styles.noCommentText}>{i18n.t('empty_comment')}</Text>
          </View>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scrollingContainer: {
    alignItems: 'stretch',
    paddingBottom: getBottomSpace(),
  },
  headerBack: {
    position: 'absolute',
    zIndex: 1,
    width: Layout.window.width,
    height: 55,
    borderBottomWidth: 1,
    justifyContent: 'center',
    borderColor: 'rgba(0,0,0,0.1)',
  },
  backWard: {
    marginLeft: 15,
    zIndex: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  map: {
    height: Layout.window.width + 30,
  },
  subheaderContainer: { marginBottom: 6 },
  subheaderText: {
    fontSize: 16,
    color: Colors.defaultGrey,
    marginBottom: 5,
  },
  information: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 39,
    paddingVertical: 6,
    paddingLeft: 27,
    paddingRight: 6,
    marginHorizontal: 10,
  },
  informationButton: {
    width: 46,
    height: 46,
    borderRadius: 46,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 24.5,
    borderWidth: 1,
    borderColor: '#e6e6e6',
  },
  commentButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  progressBox: {
    borderRadius: 5,
    minHeight: 100,
  },
  noCommentText: {
    fontSize: 13,
    textAlign: 'center',
    color: '#b7b7b7',
    letterSpacing: -0.5,
    marginVertical: 55,
  },
})
