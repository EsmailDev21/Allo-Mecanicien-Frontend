// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getFirestore,
} from "firebase/firestore";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	FacebookAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import {
	setName,
	setEmail,
	setPassword,
	setBirthDate,
	setRole,
} from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { selectAuth, setAuth } from "../redux/slices/authSlice";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCMlQH38JBs2on07h2cXECYKTzNKR8AtgA",
	authDomain: "allo-mecanicien.firebaseapp.com",
	projectId: "allo-mecanicien",
	storageBucket: "allo-mecanicien.appspot.com",
	messagingSenderId: "111744647940",
	appId: "1:111744647940:web:9b19cbf140358e720b4651",
	measurementId: "G-75M7240701",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
