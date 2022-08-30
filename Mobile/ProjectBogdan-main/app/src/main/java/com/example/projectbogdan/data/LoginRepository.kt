package com.example.projectbogdan.data

import com.example.projectbogdan.data.model.LoggedInUser
import com.example.projectbogdan.data.model.StorageProduct
import com.google.firebase.auth.AuthResult

/**
 * Class that requests authentication and user information from the remote data source and
 * maintains an in-memory cache of login status and user credentials information.
 */

class LoginRepository(val dataSource: LoginDataSource) {

    // in-memory cache of the loggedInUser object
    var user: AuthResult? = null
        private set

    val isLoggedIn: Boolean
        get() = user != null

    init {
        // If user credentials will be cached in local storage, it is recommended it be encrypted
        // @see https://developer.android.com/training/articles/keystore
        user = null
    }

    fun logout() {
        user = null
        dataSource.logout()
    }

    suspend fun login(email: String, password: String): Result<AuthResult> {
        // handle login
        val result = dataSource.login(email, password)
        if (result is Result.Success) {
            setLoggedInUser(result.data)
        }
        return result
    }

    suspend fun register(email: String, password: String): Result<AuthResult> {
        // handle login
        return dataSource.register(email, password)
    }

    suspend fun getUser(userId: String): LoggedInUser? {
        val documentSnapshot = dataSource.getUser(userId)
        return documentSnapshot?.toObject(LoggedInUser::class.java)
    }

    private fun setLoggedInUser(loggedInUser: AuthResult) {
        this.user = loggedInUser
        // If user credentials will be cached in local storage, it is recommended it be encrypted
        // @see https://developer.android.com/training/articles/keystore
    }
}