
import { initializeApp } from "firebase/app";
import { getDownloadURL, ref, uploadBytes, getStorage } from "firebase/storage";
import { toast } from "react-toastify";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    getAuth,
    onAuthStateChanged,
    sendEmailVerification,
    updateProfile,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup,
    fetchSignInMethodsForEmail,
    getAdditionalUserInfo
} from "firebase/auth";

import {
    query,
    getDocs,
    collection,
    where,
    addDoc,
    doc,
    getFirestore,
    setDoc,
    getDoc,
    updateDoc,
    deleteDoc,
    writeBatch,
} from "firebase/firestore";
import { useRef } from "react";
import Slider from "react-slick";
import { Navigate } from "react-router-dom";

const firebaseConfig = {

    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId,


};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const firestoredb = getFirestore(app);


// Create new user (Sign In)

export const registerWithEmailAndPassword = async (email, password, confirmPassword, firstName, lastName, date) => {
    try {
        if (password !== confirmPassword) {
            // Password and confirm password don't match.

            return false;
        }

        const userInfo = await createUserWithEmailAndPassword(auth, email, password);
        const user = userInfo.user;
        // Update user profile with displayName
        await updateProfile(user, {
            displayName: `${firstName} ${lastName}`,
        });

        // Store display name in Firestore
        await setDoc(doc(firestoredb, "Users", user.uid), {
            uid: user.uid,
            email: email,
            firstName: firstName,
            lastName: lastName,
            isAdmin: false
        });

        await sendEmailVerification(userInfo.user, {
            url: 'https://queryflo.datatechcon.com/login', // This is where the user will be redirected after verification
            // You can also set other action code settings as needed
        }).then(() => { toast.success("Verfication email sent"); });


        await signOut(auth);


        return true;
    } catch (error) {
        console.log(error);
        if (error.code === "auth/email-already-in-use") {
            toast.error("This Email is already Registered");
        }
        return false;
    }
};


export const getUserDisplayNameById = async (uid) => {

    if (uid) {
        try {
            const userDocRef = doc(firestoredb, "Users", uid);
            const userDocSnapshot = await getDoc(userDocRef);

            if (!userDocSnapshot.exists()) {
                // User with the provided uid not found
                return null;
            }

            const userData = userDocSnapshot.data();
            const firstName = userData.firstName;
            const lastName = userData.lastName;
            const image = userData.image;



            return {
                firstName,
                lastName,
                image
            };
        } catch (error) {
            console.error("Error getting user display name by ID", error);
            throw error;
        }
    }

};

export const loginWithEmailAndPassword = async (email, password) => {
    try {
        const userDataArray = [];

        const usersCollectionRef = collection(firestoredb, 'Users');
        const usersSnapshot = await getDocs(usersCollectionRef);

        usersSnapshot.forEach((userDoc) => {
            const userData = userDoc.data();
            userDataArray.push(userData);
        });

        // Check if the provided email exists in userDataArray
        const isUserRegistered = userDataArray.some(user => user.email === email);

        if (!isUserRegistered) {
            toast.error("User is not registered. Please register before logging in.");
            return false;
        }

        // User exists, proceed with login
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userData = {
            uid: user.uid,
            email: user.email,
        };

        if (!user.emailVerified) {
            toast.error("Email is not verified. Please verify your email before logging in.");
            return false;
        }

        localStorage.setItem('signIn', JSON.stringify(userData));
        window.location.href = "/user-dashboard";
        return userData;
    } catch (error) {
        console.log(error.code, "error code");
        console.error('Email/Password login failed:', error.message);

        if (error.code === 'auth/invalid-credential') {
            toast.error("Invalid credentials");
        }

        return false;
    }
};

// login using google

// Function to check if the email is associated with a Google account

export const loginWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const userCredentialGoogle = await signInWithPopup(auth, provider);
        const userGoogle = userCredentialGoogle.user;
        // Check if the user is signing in for the first time
        const { isNewUser } = getAdditionalUserInfo(userCredentialGoogle);


        // if (isNewUser) {
        //     // This is a new user, perform registration logic if needed
        //     toast.error("User not registered");
        //     return false;
        // } 

        // Existing user logic
        const userDataGoogle = {
            uid: userGoogle.uid,
            email: userGoogle.email,
        };


        localStorage.setItem('signIn', JSON.stringify(userDataGoogle));
        window.location.href = "/user-dashboard";

        // Return the user data
        return userDataGoogle;

    } catch (error) {
        console.error('Google Sign-In failed:', error.message);
        return false;
    }
}






export const signOutUser = async () => {
    try {
        await signOut(auth);

        localStorage.clear();

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};


// get currently authenticated user's id
const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                resolve(user);
            } else {
                resolve(false);
            }
            unsubscribe();
        });
    });
};


// Function to save user profile data to Firestore
export const editUserProfile = async (data) => {
    try {

        let userId = await getCurrentUser();
        const usersRef = collection(firestoredb, "Users");
        const userDocRef = doc(usersRef, userId.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
            await setDoc(userDocRef, data, { merge: true });

            const { firstName, lastName } = data;

            const name = `${firstName} ${lastName}`;

            await updateProfile(auth.currentUser, { displayName: name });
        } else {
            await setDoc(userDocRef, data);

            const { firstName, lastName } = data;

            const name = `${firstName} ${lastName}`;

            await updateProfile(auth.currentUser, { displayName: name });
        }


    } catch (error) {
        console.error("Error saving user profile data:", error);
    }
};



// Get current user data

export const getUserDataForCurrentUser = async () => {
    try {
        const userId = await getCurrentUser();
        return new Promise(async (resolve, reject) => {
            if (userId) {
                const userDataArray = [];
                const userDocRef = doc(firestoredb, 'Users', userId.uid);
                const userDocSnapshot = await getDoc(userDocRef);

                if (userDocSnapshot.exists()) {
                    const userData = userDocSnapshot.data();
                    userDataArray.push(userData);
                } else {
                    console.error('User document not found for UID ' + userId);
                }

                resolve(userDataArray.length > 0 ? userDataArray[0] : null);
            } else {
                resolve(null);
            }
        });
    } catch (error) {
        console.error('Error retrieving user data:', error);
        throw error;
    }
};

// get all the users

export const getAllUsers = async () => {
    try {
        const userDataArray = [];

        const usersCollectionRef = collection(firestoredb, 'Users');
        const usersSnapshot = await getDocs(usersCollectionRef);

        usersSnapshot.forEach((userDoc) => {
            const userData = userDoc.data();
            userDataArray.push(userData);
        });

        return userDataArray;
    } catch (error) {
        console.error('Error retrieving users data:', error);
        throw error;
    }
};


// upload profile image

export const uploadImg = async (image) => {
    try {
        const user = auth.currentUser;
        const userId = await getCurrentUser();
        const imageRef = ref(storage, `${userId.uid}-${Date.now()}-image`);
        const snapshot = await uploadBytes(imageRef, image);
        const imageUrl = await getDownloadURL(imageRef);
        await updateProfile(user, {
            photoURL: imageUrl,
        });
        const userDocRef = doc(firestoredb, "Users", userId.uid);

        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
            await updateDoc(userDocRef, {
                image: imageUrl,
            });

            return imageUrl;
        } else {
            console.error("User not found");
            return false;
        }
    } catch (err) {
        console.error(err);
        return false;
    }
};

// Forgot password
export const ForgotPassword = async (email) => {

    // console.log(email);
    try {
        await sendPasswordResetEmail(auth, email, { url: "https://queryflo.datatechcon.com/login" });

        // Display a pop-up or notification for successful password reset email
        toast.success('Password reset email sent. Please check your inbox.');

    } catch (error) {
        console.error('Error sending password reset email:', error.message);

        // Check if the error is due to an invalid email
        if (error.code === 'auth/invalid-email') {
            // Display a pop-up or notification for an invalid email
            toast.error('Invalid email address');
        }
    }
};

export const signInWithGoogle = async () => {
    try {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const userGoogle = result.user;

        const { displayName, email, uid, photoURL } = userGoogle;

        // Safely split display name
        let firstName = "", lastName = "";
        if (displayName) {
            const nameParts = displayName.split(" ");
            firstName = nameParts[0] || "";
            lastName = nameParts.slice(1).join(" ") || ""; // Join remaining parts in case of middle names etc.
        }

        const existingUserRef = doc(firestoredb, "Users", uid);
        const existingUserSnapshot = await getDoc(existingUserRef);

        if (!existingUserSnapshot.exists()) {
            await setDoc(existingUserRef, {
                uid: uid,
                email: email,
                firstName: firstName,
                lastName: lastName,
                isAdmin: false
            });
        }

        return {
            uid,
            email,
            displayName,
            firstName,
            lastName,
            image: photoURL
        };

    } catch (error) {
        console.error('Google Sign-In Error:', error.code, error.message);
        return false;
    }
};



export const getUserProfile = async () => {
    const userId = await getCurrentUser();

    // const { displayName, photoURL } = userId;
    let displayName = userId.displayName;
    let photoURL = userId.photoURL;
    let uid = userId.uid;

    return {
        uid, displayName, photoURL
    };
};
export const getUserByUid = async (getuser) => {

    const userId = getuser;

    // const { displayName, photoURL } = userId;
    let displayName = userId.displayName;
    let photoURL = userId.photoURL;
    let uid = userId.uid;

    return {
        uid, displayName
    };
};

// Assuming you have initialized Firebase using firebase.initializeApp(config);

// firebase/firebase.js


export function checkAuthState() {

    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, you can access the user object
                unsubscribe(); // Stop listening to further changes
                resolve(true);
            } else {
                // No user is signed in, or the user signed out
                unsubscribe(); // Stop listening to further changes
                resolve(false);
                // You can redirect to the login page or perform other actions here
            }
        }, (error) => {
            // Handle any errors during the authentication state check
            unsubscribe(); // Stop listening to further changes
            reject(error);
        });
    });
}



