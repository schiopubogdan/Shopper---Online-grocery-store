package com.example.projectbogdan.ui.login

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import android.util.Patterns
import androidx.lifecycle.viewModelScope
import com.example.projectbogdan.data.LoginRepository
import com.example.projectbogdan.data.Result

import com.example.projectbogdan.R
import kotlinx.coroutines.launch

class LoginViewModel(private val loginRepository: LoginRepository) : ViewModel() {

    private val _loginForm = MutableLiveData<LoginFormState>()
    private val _isShowingProgress = MutableLiveData<Boolean>()
    private val _successfulSignIn = MutableLiveData<Boolean>()
    private val _successfulRegister = MutableLiveData<Boolean>()

    val loginFormState: LiveData<LoginFormState> = _loginForm

    private val _loginResult = MutableLiveData<LoginResult>()
    val loginResult: LiveData<LoginResult> = _loginResult
    val isShowingProgress : LiveData<Boolean> = _isShowingProgress
    val successfulSignIn : LiveData<Boolean> = _successfulSignIn
    val successfulRegister : LiveData<Boolean> = _successfulRegister

    fun login(username: String, password: String) {
        // can be launched in a separate asynchronous job
        viewModelScope.launch {
            _isShowingProgress.postValue(true)
            val result = loginRepository.login(username, password)

            if (result is Result.Success) {
                _successfulSignIn.postValue(true)
            } else {
                _loginResult.value = LoginResult(error = R.string.login_failed)
            }
            _isShowingProgress.postValue(false)
        }
    }

    fun register(username: String, password: String) {
        // can be launched in a separate asynchronous job
        viewModelScope.launch {
            _isShowingProgress.postValue(true)
            val result = loginRepository.register(username, password)

            if (result is Result.Success) {
                _successfulRegister.postValue(true)
            } else {
                _loginResult.value = LoginResult(error = R.string.login_failed)
            }
            _isShowingProgress.postValue(false)
        }
    }

    fun logOut(){
        loginRepository.logout()
    }

    fun loginDataChanged(username: String, password: String) {
        if (!isUserNameValid(username)) {
            _loginForm.value = LoginFormState(usernameError = R.string.invalid_username)
        } else if (!isPasswordValid(password)) {
            _loginForm.value = LoginFormState(passwordError = R.string.invalid_password)
        } else {
            _loginForm.value = LoginFormState(isDataValid = true)
        }
    }

    // A placeholder username validation check
    private fun isUserNameValid(username: String): Boolean {
        return if (username.contains('@')) {
            Patterns.EMAIL_ADDRESS.matcher(username).matches()
        } else {
            username.isNotBlank()
        }
    }

    // A placeholder password validation check
    private fun isPasswordValid(password: String): Boolean {
        return password.length > 5
    }
}