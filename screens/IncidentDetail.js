import React from 'react';
import {
    FlatList,
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform, Alert,
} from 'react-native';

import { AntDesign, Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import * as actions from '../actions/newIncident';
import * as apis from '../apis';
import ProgressCard from '../components/ProgressCard';
import CommentCard from '../components/CommentCard';
import StateMarker from '../components/StateMarker';
import StateCheckButton from '../components/StateCheckButton';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { formatDate, getBottomSpace, checkIsInbuilding } from '../utils';
import { getLocalData } from '../constants/Incidents';
import NaverMap from '../components/NaverMap';
import {IncidentList} from "./index";

class IncidentDetail extends React.Component {
  constructor() {
    super();

    this.state = {
      commentList: [],
      totalCommentNum: 0,
      recentProgress: [],
      progressState: '',
    };
    this.getIncidentDetail = this.getIncidentDetail.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.onStateButtonPress = this.onStateButtonPress.bind(this);
    this.onWrongReportButtonPress = this.onWrongReportButtonPress.bind(this);
  }

  componentWillMount() {
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      this.handleRefresh
    );
    this.handleRefresh();
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  async onStateButtonPress(state) {
    const incidentId = await this.getIncidentDetail().id;
    await this.setState({ progressState: state });
    await apis.postIncidentState(incidentId, {
      userId: this.props.userId,
      state: this.state.progressState,
    });
    if (state==='오인신고') {
      this.props.navigation.navigate('IncidentList');
    }
  }

  onWrongReportButtonPress() {
    Alert.alert('오인 신고로 변경할까요?', '이 작업은 취소할 수 없습니다.', [
        { text: '취소', onPress: () => console.log('cancel') },
        { text: '변경하기', onPress: () => this.onStateButtonPress('오인신고')},
    ]);
  }

  getIncidentDetail() {
    return this.props.navigation.getParam('incidentDetail');
  }

  handleRefresh() {
    const incidentId = this.getIncidentDetail().id;
    apis
      .getIncidentComments(incidentId, this.props.userId)
      .then(response => this.setState({ commentList: response.data }));
    apis
      .getRecentProgress(incidentId)
      .then(response => this.setState({ recentProgress: response.data }));

    apis.getIncidentState(incidentId).then(response => {
      this.setState({ progressState: response.data.state });
    });
  }

  renderHeader() {
    const incidentDetail = this.getIncidentDetail();
    const { lat, lng } = incidentDetail;
    const localDetail = getLocalData(incidentDetail.type);
    const location = checkIsInbuilding({ lat, lng });

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
        <Text style={{ color: Colors.defaultBlack }}>
          {location ? location.properties.name : 'KAIST'}
        </Text>
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
          backgroundColor: this.props.isSecureTeam ? '#44aa25' : '#fda81d',
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
            backgroundColor: this.props.isSecureTeam ? '#339216' : '#ec9301',
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

  renderAdminStateBar() {
    const { progressState } = this.state;
    return (
      <View>
        <Text style={styles.subheaderText}>안전팀 확인 상태</Text>
        <View style={styles.statusContainer}>
          <StateCheckButton
            color="#d62c2c"
            selected={progressState === '확인중'}
            onPress={() => this.onStateButtonPress('확인중')}
            disabled={!this.props.isSecureTeam}
          >
            확인 중
          </StateCheckButton>
          <StateCheckButton
            color="#f5c234"
            selected={progressState === '처리중'}
            onPress={() => this.onStateButtonPress('처리중')}
            disabled={!this.props.isSecureTeam}
          >
            처리 중
          </StateCheckButton>
          <StateCheckButton
            color="#7ed321"
            selected={progressState === '완료'}
            onPress={() => this.onStateButtonPress('완료')}
            disabled={!this.props.isSecureTeam}
          >
            완료
          </StateCheckButton>
        </View>
        <TouchableOpacity
            style={[styles.statusContainer, { backgroundColor: '#6f6f6f',marginVertical: 10, paddingVertical: 14 }]}
            onPress={this.onWrongReportButtonPress}>
          <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>
            오인 신고로 변경
          </Text>
        </TouchableOpacity>
        <Text style={{fontSize: 11, letterSpacing: 0.15, color: '#959595'}}>
          <Text style={{fontWeight: 'bold'}} >* 이 작업은 취소할 수 없습니다. </Text>
          오인 신고로 변경될 경우, 해당 사고는 일반 사용자에게 더 이상 표시되지 않으며 진행 상황 등록 및 댓글 작성이 불가합니다.
        </Text>
      </View>
    );
  }

  renderClientStateBar() {
    const { progressState } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.subheaderText}>안전팀 확인 상태</Text>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <StateMarker position="left" selected={progressState === '확인중'}>
            확인 중
          </StateMarker>
          <StateMarker position="center" selected={progressState === '처리중'}>
            처리 중
          </StateMarker>
          <StateMarker position="right" selected={progressState === '완료'}>
            완료
          </StateMarker>
        </View>
      </View>
    );
  }

  renderProgressButton() {
    const incidentId = this.getIncidentDetail().id;

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

  renderProgress() {
    const progressExist = this.state.recentProgress.length > 0;

    const incidentId = this.getIncidentDetail().id;

    let recentView = null;
    if (progressExist) {
      const { createdAt, content } = this.state.recentProgress[0];
      recentView = (
        <ProgressCard
          author="안전팀"
          date={formatDate(createdAt)}
          propStyle={styles.progressBox}
        >
          {content}
        </ProgressCard>
      );
    } else {
      recentView = (
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 13, color: '#b7b7b7' }}>
            진행 상황이 없습니다.
          </Text>
        </View>
      );
    }

    return (
      //style={{ alignItems: 'stretch' }}
      <View>
        <View
          style={[
            styles.subheaderContainer,
            { flexDirection: 'row', justifyContent: 'space-between' },
          ]}
        >
          <Text style={styles.subheaderText}>Progress</Text>
          {progressExist ? (
            <Text
              style={[styles.subheaderText, { fontSize: 13 }]}
              onPress={() => {
                this.props.navigation.navigate('ProgressList', {
                  incidentId,
                });
              }}
            >
              더보기
            </Text>
          ) : null}
        </View>
        {this.props.isSecureTeam ? this.renderProgressButton() : null}
        {recentView}
      </View>
    );
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

    // 좋아요 에러 재발 시 (item , index) 로 되돌리기. 혹시 모르니 적어둠.
    const keyExtractor = item => item.id.toString();

    return (
      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollingContainer}
          enableOnAndroid
          enableAutomaticScroll
          extraScrollHeight={Platform.OS === 'android' ? 100 : 0}
          keyboardShouldPersistTaps="handled"
        >
          <NaverMap
            initialCoords={{ lat, lng }}
            draggable={false}
            style={styles.map}
            markers={[
              { key: 'incidentPos', coords: { lat: latitude, lng: longitude } },
            ]}
          />

          <View
            style={{
              backgroundColor: '#ffffff',
              marginTop: -5,
              borderRadius: 10,
              paddingVertical: 18,
              paddingHorizontal: 15,
            }}
          >
            {this.renderHeader()}
            <View style={{ height: 28 }} />
            {this.renderProtocol()}
            <View style={{ height: 24 }} />
            {this.props.isSecureTeam
              ? this.renderAdminStateBar()
              : this.renderClientStateBar()}
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
              keyExtractor={keyExtractor}
              renderItem={this.renderComment}
            />

            <Text style={styles.noCommentText}>의견이 없습니다</Text>
          </View>
        </KeyboardAwareScrollView>

        <TouchableOpacity
          style={{ position: 'absolute', top: 50, right: 16 }}
          onPress={() => this.props.navigation.goBack()}
        >
          <AntDesign name={'closecircle'} style={{ opacity: 0.3 }} size={32} />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isSecureTeam: state.auth.isSecureTeam,
  userId: state.auth.user.username,
});

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
  subheaderText: { fontSize: 16, color: Colors.defaultGrey, marginBottom: 5 },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 24.5,
    borderWidth: 1,
    borderColor: '#e6e6e6',
  },
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
  progressBox: {
    borderRadius: 5,
    minHeight: 100,
  },
  noCommentText: {
    fontSize: 13,
    textAlign: 'center',
    color: '#b7b7b7',
    letterSpacing: -0.5,
    marginVertical: 35,
  },
});
