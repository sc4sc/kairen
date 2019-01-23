import React from 'react';
import {
  FlatList,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MapView } from 'expo';
const { Marker } = MapView;
import { AntDesign, Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';

import * as actions from '../actions/newIncident';
import * as apis from '../apis';
import ProgressCard from '../components/ProgressCard';
import CommentCard from '../components/CommentCard';

import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { formatDate, getBottomSpace, dateToString } from '../utils';

import AndroidTopMargin from '../components/AndroidTopMargin';
import { getLocalData } from '../constants/Incidents';

class IncidentDetail extends React.Component {
  state = { commentList: [], totalCommentNum: 0, recentProgress: [] };
  _keyExtractor = (item, index) => item.id;

  componentWillMount() {
    this._willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      this.willFocus
    );
    this.handleRefresh();
  }

  componentWillUnmount() {
    this._willFocusSubscription.remove();
  }

  handleRefresh = () => {
    const incidentId = this.getIncidentDetail().id;

    apis
      .getIncidentComments(incidentId, { userId: this.props.userId })
      .then(response => this.setState({ commentList: response.data }));
    apis
      .getRecentProgress(incidentId)
      .then(response => this.setState({ recentProgress: response.data }));
  };

  willFocus = () => {
    this.handleRefresh();
  };

  getIncidentDetail = () => this.props.navigation.getParam('incidentDetail');

  renderHeader() {
    const incidentDetail = this.getIncidentDetail();
    const localDetail = getLocalData(incidentDetail.type);
    return (
      <View>
        <Text style={{ color: Colors.dateLightGrey }}>
          {formatDate(incidentDetail.createdAt)}
        </Text>
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
            {localDetail.title}
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
            <Text style={{ color: Colors.dangerRed }}>
              {localDetail.caution ? 'Caution' : 'Emergency'}
            </Text>
          </View>
        </View>
        <Text style={{ color: Colors.defaultBlack }}>Yuseong 291, Daejeon</Text>
      </View>
    );
  }

  renderProtocol() {
    const localDetail = getLocalData(this.getIncidentDetail().type);
    const url = localDetail.safetyProtocol;

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
    const incidentId = this.getIncidentDetail().id;

    if (this.props.isSecureTeam) {
      return (
        <TouchableOpacity
          style={[
            styles.commentButton,
            { backgroundColor: Colors.lichen, marginBottom: 10 },
          ]}
          onPress={() => {
            this.props.navigation.navigate('NewProgress', { incidentId });
          }}
        >
          <Text style={styles.commentButtonText}>진행 상황 등록하기</Text>
        </TouchableOpacity>
      );
    }

    return null;
  }

  renderProgress() {
    if (this.state.recentProgress.length > 0) {
      const incidentId = this.getIncidentDetail().id;
      const { createdAt, content } = this.state.recentProgress[0];

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
                this.props.navigation.navigate('ProgressList', { incidentId });
              }}
            >
              더보기
            </Text>
          </View>
          {this.renderProgressButton()}
          <ProgressCard author="안전팀" date={formatDate(createdAt)}>
            {content}
          </ProgressCard>
        </View>
      );
    }

    return this.renderProgressButton();
  }

  renderComment(data) {
    const {
      id,
      userId,
      like,
      content,
      createdAt,
      updatedAt,
      totalLike,
      commentIndex,
      reply,
    } = data.item;
    const commentDate = formatDate(createdAt);
    const replyDate = formatDate(updatedAt);

    return (
      <CommentCard
        commentId={id}
        author={userId}
        like={like}
        totalLike={totalLike}
        date={commentDate}
        replyDate={replyDate}
        index={commentIndex}
        reply={reply}
      >
        {content}
      </CommentCard>
    );
  }

  render() {
    const { id: incidentId, lat, lng } = this.getIncidentDetail();

    const latitude = Number(lat);
    const longitude = Number(lng);

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
              latitude,
              longitude,
              latitudeDelta: 0.00522,
              longitudeDelta: 0.00221,
            }}
          >
            <Marker coordinate={{ latitude, longitude }} />
          </MapView>
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
              this.props.navigation.navigate('NewComment', { incidentId });
            }}
          >
            <Text style={styles.commentButtonText}>새로운 의견 등록하기</Text>
          </TouchableOpacity>

          <FlatList
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
    userId: state.auth.user.username,
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
