import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { MapView } from 'expo';
import ProgressCard from '../components/ProgressCard';
import ConfirmedText from '../components/ConfirmedText';

import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { Feather, AntDesign } from '@expo/vector-icons';

export class IncidentDetail extends React.Component {
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
        <View
          style={{
            width: 46,
            height: 46,
            backgroundColor: '#339216',
            borderRadius: 46,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Feather name="arrow-right" size={32} style={{ color: 'white' }} />
        </View>
      </View>
    );
  }

  renderProgress() {
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
            style={styles.subheaderText}
            onPress={() => {
              this.props.navigation.navigate('Progress');
            }}
          >
            더보기
          </Text>
        </View>
        <ProgressCard author="안전팀" date="Jan 1, 2019">
          화재 진압되었습니다. 유성구 소방서와 함께 사고 원인 조사중 입니다.
        </ProgressCard>
      </View>
    );
  }

  render() {
    return (
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ alignItems: 'stretch' }}
      >
        <View>
          <MapView
            style={styles.map}
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
        </View>
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
          <Comment confirmed likes={20} />
          <Comment likes={4} />
        </View>
      </ScrollView>
    );
  }
}

// TODO:: Component 추출, Comment와 Progress간 Border랑 Content 레이아웃이 겹치는 부분이 조금 있는 것 같다!
const Comment = ({ confirmed, likes }) => {
  return (
    <View
      style={[
        styles.borderedContentBox,
        {
          flexDirection: 'row',
          alignItems: 'stretch',
          marginTop: 10,
          borderColor: Colors.borderGrey,
        },
      ]}
    >
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
          }}
        >
          <Text
            style={{
              fontSize: 13,
              fontWeight: 'bold',
              color: Colors.defaultGrey,
            }}
          >
            #2 김철수
          </Text>
          <View style={{ width: 9 }} />
          <Text style={{ fontSize: 11, color: Colors.dateLightGrey }}>
            Jan 1, 2019
          </Text>
        </View>
        <Text style={{ marginVertical: 10 }}>
          화재 원인은 담배꽁초였던 것 같습니다.
        </Text>
        <View style={{ flex: 1 }} />
        {confirmed ? <ConfirmedText>안전팀 확인</ConfirmedText> : null}
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
        <Text
          style={{ fontWeight: 'bold', fontSize: 16, color: Colors.likeBlue }}
        >
          {likes}
        </Text>
        <View style={{ width: 5 }} />
        <AntDesign
          name={likes > 5 ? 'like1' : 'like2'}
          size={20}
          style={{ color: Colors.likeBlue }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  borderedContentBox: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 13,
    paddingBottom: 10,
    minHeight: 100,
  },
});
