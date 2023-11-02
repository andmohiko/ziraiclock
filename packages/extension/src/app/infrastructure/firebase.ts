import { initializeApp } from 'firebase/app';
import { serverTimestamp as getServerTimeStamp, getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import config from './firebaseConfig.json';

const firebaseApp = initializeApp({ ...config });

const firestore = getFirestore(firebaseApp);
const storage = getStorage();
const serverTimestamp = getServerTimeStamp();

export { firestore, storage, serverTimestamp };
