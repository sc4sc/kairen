import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Linking,
} from 'react-native';
import { MapView } from 'expo';
import axios from 'axios';
import { Feather, AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux';
import * as actions from '../actions/newIncident';
import * as apis from '../apis';

import ConfirmedText from '../components/ConfirmedText';
import ProgressCard from '../components/ProgressCard';
import CommentCard from '../components/CommentCard';

import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { getBottomSpace } from '../utils';

import AndroidTopMargin from '../components/AndroidTopMargin';

class IncidentDetail extends React.Component {
  state = { commentList: [], totalCommentNum: 0, recentProgress: [] };
  _keyExtractor = (item, index) => item.id;

  componentWillMount() {
    apis
      .getIncidentComments(1)
      .then(response => this.setState({ commentList: response.data }));
    apis
      .getRecentProgress(1)
      .then(response => this.setState({ recentProgress: response.data }));
  }

  renderHeader() {
    return (
      <View>
        <Text style={{ color: Colors.dateLightGrey }}>Jan 14, 2019</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 28,
              color: Colors.defaultBlack,
            }}
          >
            Conflagration
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 50,
                backgroundColor: Colors.dangerRed,
              }}
            />
            <View style={{ width: 5 }} />
            <Text style={{ color: Colors.dangerRed }}>Emergency</Text>
          </View>
        </View>
        <Text style={{ color: Colors.defaultBlack }}>Yuseong 291, Daejeon</Text>
      </View>
    );
  }

  renderProtocol() {
    const url = 'http://m.safekorea.go.kr/idsiSFK/neo/main_m/sot/fire.html';

    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: 39,
          paddingVertical: 6,
          paddingLeft: 27,
          paddingRight: 6,
          marginHorizontal: 10,
          backgroundColor: '#44aa25',
        }}
      >
        <View>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
            가까운 안전한 장소로 이동하세요
          </Text>
          <Text style={{ color: 'white' }}>자세한 행동 강령 보기</Text>
        </View>
        <TouchableOpacity
          style={{
            width: 46,
            height: 46,
            backgroundColor: '#339216',
            borderRadius: 46,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => Linking.openURL(url)}
        >
          <Feather name="arrow-right" size={32} style={{ color: 'white' }} />
        </TouchableOpacity>
      </View>
    );
  }

  renderProgressButton() {
    if (this.props.isSecureTeam) {
      return (
        <TouchableOpacity
          style={[
            styles.commentButton,
            { backgroundColor: Colors.lichen, marginBottom: 10 },
          ]}
          onPress={() => {
            this.props.navigation.navigate('NewProgress');
          }}
        >
          <Text style={styles.commentButtonText}>진행 상황 등록하기</Text>
        </TouchableOpacity>
      );
    }

    return null;
  }

  /* TODO : Utils 쪽으로 옮기기 / 현재 function이 아니라는 에러가 있음. 왜..? */
  parseCreatedAt(createdAt) {
    const dateObject = new Date(Date.parse(createdAt));
    const year = dateObject.getFullYear(createdAt);
    const month = dateObject.getMonth(createdAt) + 1;
    const date = dateObject.getDate(createdAt);

    const dateString =
      month.toString() + '/' + date.toString() + ', ' + year.toString();

    return dateString;
  }

  renderProgress() {
    if (this.state.recentProgress[0] != undefined) {
      const { id, content, createdAt } = this.state.recentProgress[0];
      const dateObject = new Date(Date.parse(createdAt));
      const year = dateObject.getFullYear(createdAt);
      const month = dateObject.getMonth(createdAt) + 1;
      const date = dateObject.getDate(createdAt);

      const dateString =
        month.toString() + '/' + date.toString() + ', ' + year.toString();

      return (
        <View>
          <View
            style={[
              styles.subheaderContainer,
              { flexDirection: 'row', justifyContent: 'space-between' },
            ]}
          >
            <Text style={styles.subheaderText}>Progress</Text>
            <Text
              style={[styles.subheaderText, { fontSize: 13 }]}
              onPress={() => {
                this.props.navigation.navigate('Progress');
              }}
            >
              더보기
            </Text>
          </View>
          {this.renderProgressButton()}
          <ProgressCard author="안전팀" date={dateString}>
            {content}
          </ProgressCard>
        </View>
      );
    }
  }

  renderComment(data) {
    const { userId, Like, content, createdAt, totalLike } = data.item;
    const dateObject = new Date(Date.parse(createdAt));
    const year = dateObject.getFullYear(createdAt);
    const month = dateObject.getMonth(createdAt) + 1;
    const date = dateObject.getDate(createdAt);

    const dateString =
      month.toString() + '/' + date.toString() + ', ' + year.toString();

    return (
      <CommentCard
        author={userId}
        like={Like}
        totalLike={totalLike}
        date={dateString}
        index={data.index + 1}
      >
        {content}
      </CommentCard>
    );
  }

  render() {
    return (
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollingContainer}
      >
        <AndroidTopMargin />
        <SafeAreaView>
          <MapView
            style={styles.map}
            rotateEnabled={false}
            scrollEnabled={false}
            zoomEnabled={false}
            pitchEnabled={false}
            initialRegion={{
              latitude: 36.374159,
              longitude: 127.365864,
              latitudeDelta: 0.00522,
              longitudeDelta: 0.00221,
            }}
          />
          <TouchableOpacity
            style={{ position: 'absolute', top: 50, right: 16 }}
            onPress={() => this.props.navigation.goBack()}
          >
            <AntDesign
              name={'closecircle'}
              style={{ opacity: 0.3 }}
              size={32}
            />
          </TouchableOpacity>
        </SafeAreaView>
        <View style={{ paddingVertical: 18, paddingHorizontal: 15 }}>
          {this.renderHeader()}
          <View style={{ height: 28 }} />
          {this.renderProtocol()}
          <View style={{ height: 24 }} />
          {this.renderProgress()}
          <View style={{ height: 24 }} />
          <Text style={[styles.subheaderContainer, styles.subheaderText]}>
            Comment
          </Text>
          <TouchableOpacity
            style={styles.commentButton}
            onPress={() => {
              this.props.navigation.navigate('Comment');
            }}
          >
            <Text style={styles.commentButtonText}>새로운 의견 등록하기</Text>
          </TouchableOpacity>

          <FlatList
            inverted
            data={this.state.commentList}
            renderItem={this.renderComment}
            keyExtractor={this._keyExtractor}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSecureTeam: state.auth.isSecureTeam,
  };
};

export default connect(
  mapStateToProps,
  actions
)(IncidentDetail);

const styles = StyleSheet.create({
  scrollingContainer: {
    alignItems: 'stretch',
    paddingBottom: getBottomSpace(),
  },
  map: { height: Layout.window.width },
  subheaderContainer: { marginBottom: 6 },
  subheaderText: { fontSize: 16, color: Colors.defaultGrey },
  commentButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 13,
    backgroundColor: Colors.buttonGrey,
    borderRadius: 10,
  },
  commentButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
});
