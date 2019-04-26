import { Constants } from 'expo';

let URL;

if ( Constants.manifest.releaseChannel && Constants.manifest.releaseChannel === 'production' ) {
  URL = 'https://lambda2.kaist.ac.kr';
} else {
  URL = 'https://kairen.kaist.ac.kr/api';
}

export default URL;
