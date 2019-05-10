import { Constants } from 'expo';

let URL;

// Only Production Apps
if ( Constants.manifest.releaseChannel && Constants.manifest.releaseChannel === 'production' ) {
  URL = 'https://lambda2.kaist.ac.kr';
} else {
  // Development / Test Apps
  URL = 'https://kairen.kaist.ac.kr/api';
}

export default URL;
