import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Sentry } from 'react-native-sentry'

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    Sentry.captureException(error)
  }

  handleClickRefresh = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>에러가 발생해 앱이 종료되었습니다.</Text>
          <Text style={styles.text}>
            지속되면 kairen@kaist.ac.kr로 문의해주세요.
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.handleClickRefresh}>
              <Text>새로고침</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    return this.props.children
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    paddingHorizontal: 36,
    marginTop: 12,
  },
  buttonContainer: {
    marginTop: 24,
  },
  button: {
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
})

export default ErrorBoundary
