import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import * as apis from '../apis';

import ConfirmedText from './ConfirmedText';
import CommentReplyCard from './CommentReplyCard';
import ProgressCard from './ProgressCard';

import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { apisAreAvailable } from 'expo';

class CommentCard extends React.Component {
  constructor(props) {
    super(props);
    state = { like: false, isEditReply: false, replyExist: false };

    this.changeEditState = this.changeEditState.bind(this);
    this.onConfirmPress = this.onConfirmPress.bind(this);
  }

  componentWillMount() {
    this.setState({ like: this.props.like, replyExist: this.props.replyExist });
  }

  changeEditState() {
    this.setState({ isEditReply: !this.state.isEditReply });
  }

  onConfirmPress(text) {
    apis.postReply(this.props.commentId, {
      userId: this.props.userId,
      content: text,
    });

    this.setState({
      isEditReply: !this.state.isEditReply,
      replyExist: true,
    });
  }

  renderReplyBox() {
    const { onPressReply, replyExist } = this.props;

    if (this.state.isEditReply) {
      return (
        <CommentReplyCard
          onCanclePress={this.changeEditState}
          onConfirmPress={this.onConfirmPress}
        />
      );
    }

    if (this.state.replyExist) {
      return (
        <ProgressCard isComment author="안전팀" date="Jan 1, 2019">
          화재
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </ProgressCard>
      );
    }

    if (onPressReply) {
      return (
        <TouchableOpacity
          style={styles.replyBoxStyle}
          onPress={this.changeEditState}
        >
          <View style={{ flex: 1 }} />
          <View style={styles.replyTextContainer}>
            <Text style={styles.replyTextStyle}> 답변 추가하기 </Text>
          </View>
        </TouchableOpacity>
      );
    }

    return null;
  }

  render() {
    const { index, author, date, totalLike, children } = this.props;

    const {
      borderedContentBox,
      authorContainer,
      authorText,
      dateStyle,
      commentStyle,
      likeStyle,
    } = styles;

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.borderedContentBox}>
          <View style={{ flex: 1 }}>
            <View style={authorContainer}>
              <Text style={styles.authorText}>
                #{index} {author}
              </Text>
              <View style={{ width: 9 }} />
              <Text style={dateStyle}>{date}</Text>
            </View>

            <Text style={commentStyle}>{children}</Text>
            <View style={{ flex: 1 }} />
          </View>

          <View
            style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}
          >
            {/* TODO : 좋아요 갯수 서버 연동. 지금은 보여주기용 임시방편 */}
            <Text style={likeStyle}>
              {this.state.like ? totalLike + 1 : totalLike}
            </Text>
            <View style={{ width: 5 }} />
            <TouchableWithoutFeedback
              onPress={() => {
                this.setState({ like: !this.state.like });
              }}
            >
              <AntDesign
                name={this.state.like ? 'like1' : 'like2'}
                size={20}
                style={{ color: Colors.likeBlue }}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
        {this.renderReplyBox()}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    onPressReply: state.auth.isSecureTeam,
  };
};

export default connect(mapStateToProps)(CommentCard);

const styles = StyleSheet.create({
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  authorText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.defaultGrey,
  },
  dateStyle: { fontSize: 11, color: Colors.dateLightGrey },
  commentStyle: { marginVertical: 10, fontSize: 13, color: '#4a4a4a' },
  likeStyle: { fontWeight: 'bold', fontSize: 16, color: Colors.likeBlue },
  borderedContentBox: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 13,
    paddingBottom: 10,
    minHeight: 100,
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 10,
    borderColor: Colors.borderGrey,
    backgroundColor: 'white',
    zIndex: 999,
  },
  replyBoxStyle: {
    backgroundColor: '#e9e9e9',
    borderRadius: 10,
    height: 80,
    marginTop: -40,
    justifyContent: 'center',
  },
  replyTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  replyTextStyle: {
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
});
