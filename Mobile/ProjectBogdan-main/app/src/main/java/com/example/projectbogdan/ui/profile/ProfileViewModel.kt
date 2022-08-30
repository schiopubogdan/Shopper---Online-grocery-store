package com.example.projectbogdan.ui.profile

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.projectbogdan.data.LoginRepository
import com.example.projectbogdan.data.model.StorageProduct
import com.google.firebase.auth.FirebaseAuth
import kotlinx.coroutines.launch

class ProfileViewModel(private val loginRepository: LoginRepository) : ViewModel() {
    private val _email = MutableLiveData<String>()

    val email: LiveData<String> = _email
    val mAuth = FirebaseAuth.getInstance()

    init {
        getEmail()
    }

    fun getEmail() {
        val userId = mAuth.currentUser?.uid
        if (userId == null) {
            return
        }
        viewModelScope.launch {
            val user = loginRepository.getUser(userId)
            _email.postValue(user?.email)
        }
    }

    fun logOut(){
        loginRepository.logout()
    }
}