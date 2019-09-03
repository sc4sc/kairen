import Constants from 'expo-constants'
let URL

// Only Production Apps
if (
  Constants.manifest.releaseChannel &&
  Constants.manifest.releaseChannel === 'production'
) {
  URL = 'https://kairen.xyz:443/api'
} else {
  // No Tailing slash
  // Development / Test App
  URL = 'http://35.221.93.138:12422'
}

export default URL
