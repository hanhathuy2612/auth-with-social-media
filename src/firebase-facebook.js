// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAhDeTcy_8vgBCq5hZnF-Wrl0R6nVnRcfg",
    authDomain: "fir-auth-article-b6631.firebaseapp.com",
    projectId: "fir-auth-article-b6631",
    storageBucket: "fir-auth-article-b6631.appspot.com",
    messagingSenderId: "520050099881",
    appId: "1:520050099881:web:dc491cfd317ebc1bce8bb8",
    measurementId: "G-8F5ZSR8GX6"
};

// Initialize Firebase
const faceboookApp = initializeApp(firebaseConfig);
const facebookAuth = getAuth(faceboookApp);
const facebookDb = getFirestore(faceboookApp);
const facebookProvider = new FacebookAuthProvider();

const signInWithFacebook = async () => {
    try {
        await signInWithPopup(facebookAuth, facebookProvider).then(async res => {
            const user = res.user;
            const q = query(collection(facebookDb, "users"), where("uid", "==", user.uid));
            const docs = await getDocs(q);
            if (docs.docs.length === 0) {
                await addDoc(collection(facebookDb, "users"), {
                    uid: user.uid,
                    name: user.displayName,
                    authProvider: "google",
                    email: user.email,
                });
            }
        });

    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

export {
    facebookAuth as auth,
    facebookDb as db,
    signInWithFacebook,
};
