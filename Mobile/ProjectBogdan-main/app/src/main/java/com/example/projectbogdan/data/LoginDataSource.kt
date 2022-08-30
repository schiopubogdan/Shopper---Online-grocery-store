package com.example.projectbogdan.data

import com.example.projectbogdan.data.model.LoggedInUser
import com.google.firebase.auth.AuthResult
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.DocumentSnapshot
import com.google.firebase.firestore.QuerySnapshot
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase
import kotlinx.coroutines.tasks.await
import java.io.IOException

/**
 * Class that handles authentication w/ login credentials and retrieves user information.
 */
class LoginDataSource {
    val firebaseAuth = FirebaseAuth.getInstance()
    val firestore = Firebase.firestore
    suspend fun login(email: String, password: String): Result<AuthResult> {
        return try {
            val data = firebaseAuth
                .signInWithEmailAndPassword(email, password)
                .await()
            Result.Success(data)
        } catch (e: Throwable) {
            Result.Error(IOException("Error logging in", e))
        }
    }

    suspend fun register(email: String, password: String): Result<AuthResult> {
        return try {
            val data = firebaseAuth
                .createUserWithEmailAndPassword(email, password)
                .await()
            Result.Success(data)
        } catch (e: Throwable) {
            Result.Error(IOException("Error trying to register.", e))
        }
    }

    suspend fun getUser(userId: String): DocumentSnapshot?{
        return try {
            val data = firestore
                .collection("user_details")
                .document(userId)
                .get()
                .await()
            data
        } catch (e: Throwable) {
            null
        }
    }

    fun logout() {
        firebaseAuth.signOut()
    }
}