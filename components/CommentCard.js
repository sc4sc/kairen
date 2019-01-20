import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import ConfirmedText from '../components/ConfirmedText';
import ProgressCard from '../components/ProgressCard';

import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { renderChildElements } from '@shoutem/ui/html';

export default class CommentCard extends React.Component {
  state = { isSecureTeam: false, confirmed: false };

  componentWillMount() {
    const { isSecureTeam, confirmed } = this.props;
    this.setState({ isSecureTeam: isSecureTeam, confirmed: confirmed });
  }

  renderReplyBox() {
    if (this.state.isSecureTeam && !this.state.confirmed) {
      return (
        <TouchableOpacity style={styles.replyBoxStyle}>
          <View style={{ flex: 1 }} />
          <View style={styles.replyTextContainer}>
            <Text style={styles.replyTextStyle}> 답변 추가하기 </Text>
          </View>
        </TouchableOpacity>
      );
    } else if (this.state.isSecureTeam) {
      return (
        <ProgressCard isComment author="안전팀" date="Jan 1, 2019">
          화재
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
        </ProgressCard>
      );
    }

    return null;
  }

  render() {
    const { author, date, likes, children } = this.props;

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
              <Text style={styles.authorText}>{author}</Text>
              <View style={{ width: 9 }} />
              <Text style={dateStyle}>{date}</Text>
            </View>

            <Text style={commentStyle}>{children}</Text>
            <View style={{ flex: 1 }} />
            {this.state.confirmed ? (
              <ConfirmedText>안전팀 확인</ConfirmedText>
            ) : null}
          </View>

          <View
            style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}
          >
            <Text style={likeStyle}>{likes}</Text>
            <View style={{ width: 5 }} />
            <AntDesign
              name={likes > 5 ? 'like1' : 'like2'}
              size={20}
              style={{ color: Colors.likeBlue }}
            />
          </View>
        </View>
        {this.renderReplyBox()}
      </View>
    );
  }
}

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
