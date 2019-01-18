import React from 'react';


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

export default Comment;