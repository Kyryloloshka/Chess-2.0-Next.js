import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from "firebase/firestore";

export const getUserByUID = async (uid: string) => {
  try {
    const q = query(collection(db, 'profiles'), where('uid', '==', uid));
    
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    } else {
      return {};
    }
  } catch (error) {
    console.error('Помилка при отриманні користувача за UID:', error);
    throw error;
  }
};

const createUserInUserCollection = async (user: User) => {
  
  try {
    const q = query(collection(db, 'profiles'), where('uid', '==', user.uid));
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      const userData = {
        uid: user.uid,
        email: user.email,
        username: user.displayName ? user.displayName : "anonymous",
        gamesPlayed: 0,
        gamesLosed: 0,
        gamesWon: 0,
        country: {value: "world", label: "world"},
        status: null,
        bio: null,
        games: [],
      };
      
      await addDoc(collection(db, 'profiles'), userData);
    }
  } catch (error) {
    console.error('Check user exist error:', error);
  }
}

export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    createUserInUserCollection(cred.user)
    return cred;
  } catch (error) {
    console.error(error);
  }
};

export const doSignInWithEmailAndPassword = (email: string, password: string) => {
  try {
    const userCredential = signInWithEmailAndPassword(auth, email, password);
    console.log(userCredential);
    return userCredential;
  } catch (error) {
    console.error(error);
  }
};

export const doSignInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    createUserInUserCollection(cred.user)
  } catch (error) {
    console.error(error);
  }
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password: string) => {
  return auth.currentUser ?  updatePassword(auth.currentUser, password) : null;
};

export const doSendEmailVerification = () => {
  return auth.currentUser ? sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  }) : null
};