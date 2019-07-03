import Constants from 'expo-constants';
let URL;

// Only Production Apps
if (
  Constants.manifest.releaseChannel &&
  Constants.manifest.releaseChannel === 'production'
) {
  URL = 'https://lambda2.kaist.ac.kr';
} else {
  // Development / Test Apps
  URL = 'http://kairen.kaist.ac.kr:12422';
}

export default URL;
