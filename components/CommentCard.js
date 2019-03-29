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
    state = { like: false, totalLike: 0, reply: '', isEditReply: false };

    this.changeEditState = this.changeEditState.bind(this);
    this.onConfirmPress = this.onConfirmPress.bind(this);
  }

  componentWillMount() {
    const { like, totalLike, reply } = this.props;
    this.setState({ like, totalLike, reply });
  }

  changeEditState() {
    this.setState({ isEditReply: !this.state.isEditReply });
  }

  onConfirmPress(text) {
    apis.postReply(this.props.commentId, {
      content: text,
    });

    this.setState({
      isEditReply: !this.state.isEditReply,
      reply: text,
    });
  }

  onLikePress() {
    const { commentId } = this.props;

    if (this.state.like) {
      apis.postUnlike(commentId);
      this.setState({ totalLike: this.state.totalLike - 1 });
    } else {
      apis.postLike(commentId);
      this.setState({ totalLike: this.state.totalLike + 1 });
    }
    this.setState({ like: !this.state.like });
  }

  renderReplyBox() {
    const { commentId, onPressReply, replyExist } = this.props;
    if (this.state.isEditReply) {
      return (
        <CommentReplyCard
          commentId={commentId}
          onCanclePress={this.changeEditState}
          onConfirmPress={this.onConfirmPress}
        />
      );
    }

    if (this.state.reply) {
      return (
        <ProgressCard
          isComment
          author="안전팀"
          date={this.props.replyDate}
          propStyle={{ borderRadius: 10, paddingBottom: 15 }}
        >
          {this.state.reply}
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
    const { index, author, date, children } = this.props;

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
            <Text style={likeStyle}>{this.state.totalLike}</Text>
            <View style={{ width: 5 }} />
            <TouchableWithoutFeedback onPress={this.onLikePress.bind(this)}>
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
    onPressReply: state.auth.user.isAdmin,
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
