import Constants from 'expo-constants'
let URL

// Only Production Apps
if (
  Constants.manifest.releaseChannel &&
  Constants.manifest.releaseChannel === 'production'
) {
  URL = 'https://lambda2.kaist.ac.kr'
} else {
  // No Tailing slash
  // Development / Test Apps
  URL = 'http://35.244.187.226'
}

export default URL
