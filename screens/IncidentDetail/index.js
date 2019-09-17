import React from 'react';
import {
  FlatList,
  Linking,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  Image,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import * as actions from '../../actions/incidentsList';
import * as apis from '../../apis';
import ProgressCard from '../../components/ProgressCard';
import CommentCard from '../../components/CommentCard';
import StateMarker from '../../components/StateMarker';
import StateCheckButton from '../../components/StateCheckButton';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';
import {
  formatDate,
  checkIsInbuilding,
  getStatusBarHeight,
  getBottomSpace,
} from '../../utils';
import { getLocalData } from '../../constants/Incidents';
import NaverMap from '../../components/NaverMap';
import i18n from '../../i18n';
import DeleteIncident from "./DeleteIncident";
import {StackActions} from "react-navigation";

const statusBarHeight = getStatusBarHeight();

class IncidentDetail extends React.Component {
  constructor() {
    super();

    this.state = {
      commentList: [],
      totalCommentNum: 0,
      recentProgress: [],
      progressState: '',
      headerBackToggle: false,
    };
    this.getIncidentDetail = this.getIncidentDetail.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.onStateButtonPress = this.onStateButtonPress.bind(this);
    this.onWrongReportButtonPress = this.onWrongReportButtonPress.bind(this);
    this.onDeletePress = this.onDeletePress.bind(this);
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
        state: this.state.progressState,
      });
      if (state === '오인신고') {
        this.props.navigation.navigate('IncidentList');
      }
    }

    async onDeletePress() {
      try {
        await Promise.reject({ response: { status: 500 } });
        this.props.navigation.dispatch(StackActions.popToTop());
      } catch (e) {
        if (e.response && e.response.status === 404) {
          Alert.alert('더 이상 존재하지 않는 제보입니다.');
          this.props.navigation.dispatch(StackActions.popToTop());
        } else if (e.request && !e.response) {
          Alert.alert('네트워크 오류가 발생했습니다.\n 잠시 후에 다시 시도해주세요.'); // network
        } else {
          Alert.alert('알 수 없는 오류가 발생했습니다.\n 잠시 후에 다시 시도해주세요.'); // 500 or others
        }
      }
  }

  onWrongReportButtonPress() {
    Alert.alert('오인 신고로 변경할까요?', '이 작업은 취소할 수 없습니다.', [
      { text: '취소', onPress: () => console.log('cancel') },
      { text: '변경하기', onPress: () => this.onStateButtonPress('오인신고') },
    ]);
  }

  getIncidentDetail() {
    return this.props.navigation.getParam('incidentDetail');
  }

  handleRefresh() {
    const incidentId = this.getIncidentDetail().id;
    apis
      .getIncidentComments(incidentId)
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

    switch (localDetail.type) {
      case '화재':
        imageSrc = require('../../assets/images/incidentDetail/fire.jpg');
        break;
      case '가스':
        imageSrc = require('../../assets/images/incidentDetail/gas.jpg');
        break;
      case '화학물질 누출':
        imageSrc = require('../../assets/images/incidentDetail/flask.jpg');
        break;
      case '생물학적 유해물질 누출':
        imageSrc = require('../../assets/images/incidentDetail/biohazard.jpg');
        break;
      case '방사선':
        imageSrc = require('../../assets/images/incidentDetail/radiation.jpg');
        break;
      case '지진':
        imageSrc = require('../../assets/images/incidentDetail/earthquake.jpg');
        break;
      case '엘레베이터 사고':
        imageSrc = require('../../assets/images/incidentDetail/lift.jpg');
        break;
      case '정전':
        imageSrc = require('../../assets/images/incidentDetail/antistatic.jpg');
        break;
    }

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
            <Image source={imageSrc} />
          </View>
        </View>
        <Text style={{ color: Colors.defaultBlack }}>
          {location ? location.properties.name : 'KAIST'}
        </Text>
      </View>
    );
  }

  renderCallToInformant(name, mobile) {
    return (
      <View style={[styles.information, { backgroundColor: '#44aa25' }]}>
        <View>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
            {i18n.t('call_to_informant')}
          </Text>
          <Text style={{ fontSize: 10, color: 'white' }}>
            {name}, {mobile}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.informationButton, { backgroundColor: '#27820d' }]}
          onPress={() => Linking.openURL(`tel:${mobile}`)}
        >
          <Image source={require('../../assets/images/call.png')} />
        </TouchableOpacity>
      </View>
    );
  }

  renderProtocol() {
    const localDetail = getLocalData(this.getIncidentDetail().type);
    const url = localDetail.safetyProtocol;

    return (
      <View style={[styles.information, { backgroundColor: '#ff9412' }]}>
        <View>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
            {i18n.t('safety_instructions')}
          </Text>
          <Text style={{ color: 'white' }}>{i18n.t('code_of_conduct')}</Text>
        </View>
        <TouchableOpacity
          style={[styles.informationButton, { backgroundColor: '#db7d0a' }]}
          onPress={() => Linking.openURL(url)}
        >
          <Image source={require('../../assets/images/right-arrow.png')} />
        </TouchableOpacity>
      </View>
    );
  }

  renderAdminStateBar() {
    const { progressState } = this.state;
    return (
      <View>
        <Text style={styles.subheaderText}>{i18n.t('progress_status')}</Text>
        <View style={styles.statusContainer}>
          <StateCheckButton
            color="#d62c2c"
            selected={progressState === '확인중'}
            onPress={() => this.onStateButtonPress('확인중')}
            disabled={!this.props.isSecureTeam}
          >
            {i18n.t('확인중')}
          </StateCheckButton>
          <StateCheckButton
            color="#f5c234"
            selected={progressState === '처리중'}
            onPress={() => this.onStateButtonPress('처리중')}
            disabled={!this.props.isSecureTeam}
          >
            {i18n.t('처리중')}
          </StateCheckButton>
          <StateCheckButton
            color="#7ed321"
            selected={progressState === '완료'}
            onPress={() => this.onStateButtonPress('완료')}
            disabled={!this.props.isSecureTeam}
          >
            {i18n.t('완료')}
          </StateCheckButton>
        </View>
        <TouchableOpacity
          style={[
            styles.statusContainer,
            {
              backgroundColor: '#6f6f6f',
              marginVertical: 10,
              paddingVertical: 14,
            },
          ]}
          onPress={this.onWrongReportButtonPress}
        >
          <Text style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}>
            {i18n.t('change_to_misreport')}
          </Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 11, letterSpacing: 0.15, color: '#959595' }}>
          <Text style={{ fontWeight: 'bold' }}>{i18n.t('cannot_cancel')}</Text>
          {i18n.t('misreport_alert')}
        </Text>
      </View>
    );
  }

  renderClientStateBar() {
    const { progressState } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.subheaderText}>{i18n.t('progress_status')}</Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <StateMarker position="left" selected={progressState === '확인중'}>
            {i18n.t('확인중')}
          </StateMarker>
          <StateMarker position="center" selected={progressState === '처리중'}>
            {i18n.t('처리중')}
          </StateMarker>
          <StateMarker position="right" selected={progressState === '완료'}>
            {i18n.t('완료')}
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
        <Text style={styles.commentButtonText}>{i18n.t('new_progress')}</Text>
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
            {i18n.t('empty_progress')}
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
              {i18n.t('more')}
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
      User: { Id, ku_kname, displayName },
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
        author={ku_kname}
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

  checkHeaderOpacity = event => {
    if (
      event.nativeEvent.contentOffset.y >=
      Layout.window.width - (statusBarHeight + 55)
    ) {
      this.setState({
        headerBackToggle: true,
      });
    } else {
      this.setState({
        headerBackToggle: false,
      });
    }
  };

  render() {
    const { id: incidentId, lat, lng, User } = this.getIncidentDetail();

    const latitude = Number(lat);
    const longitude = Number(lng);

    const { isSecureTeam, isTraining } = this.props;

    // 좋아요 에러 재발 시 (item , index) 로 되돌리기. 혹시 모르니 적어둠.
    const keyExtractor = item => item.id.toString();

    return (
      <View style={{ flex: 1 }}>
        <View
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
          ]}
        />
        <TouchableOpacity
          style={styles.backWard}
          onPress={() => {
            this.props.navigation.goBack();
          }}
        >
          <Image source={require('../../assets/images/back.png')} />
          <Text style={{ marginLeft: 5, fontSize: 18, fontWeight: '800' }}>
            {i18n.t('incident_list')}
          </Text>
        </TouchableOpacity>
        <KeyboardAwareScrollView
          onScroll={this.checkHeaderOpacity}
          contentContainerStyle={styles.scrollingContainer}
          enableOnAndroid
          enableAutomaticScroll
          extraScrollHeight={Platform.OS === 'android' ? 100 : 0}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          <NaverMap
            initialCoords={{ lat, lng }}
            draggable={false}
            style={styles.map}
            markers={[
              { key: 'incidentPos', coords: { lat: latitude, lng: longitude } },
            ]}
          />
          {isSecureTeam && isTraining
              ? <DeleteIncident onPress={this.onDeletePress}/>
              : undefined}
          <View
            style={{
              backgroundColor: '#ffffff',
              paddingVertical: 18,
              paddingHorizontal: 15,
            }}
          >
            {this.renderHeader()}
            <View style={{ height: 28 }} />
            {isSecureTeam
              ? this.renderCallToInformant(User.ku_kname, User.mobile)
              : this.renderProtocol()}
            <View style={{ height: 24 }} />
            {isSecureTeam
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
              <Text style={styles.commentButtonText}>
                {i18n.t('new_comment')}
              </Text>
            </TouchableOpacity>

            <FlatList
              data={this.state.commentList}
              keyExtractor={keyExtractor}
              renderItem={this.renderComment}
            />

            <Text style={styles.noCommentText}>{i18n.t('empty_comment')}</Text>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isSecureTeam: state.auth.user.isAdmin,
  isTraining: true
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
  headerBack: {
    position: 'absolute',
    zIndex: 1,
    width: Layout.window.width,
    height: statusBarHeight + 55,
    // backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  backWard: {
    position: 'absolute',
    top: statusBarHeight + (getBottomSpace() != 0 ? 20 : 15),
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
  subheaderText: { fontSize: 16, color: Colors.defaultGrey, marginBottom: 5 },
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
