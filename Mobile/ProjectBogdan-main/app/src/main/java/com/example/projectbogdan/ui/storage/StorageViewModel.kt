package com.example.projectbogdan.ui.storage

import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.projectbogdan.data.StorageRepository
import com.example.projectbogdan.data.model.StorageProduct
import com.google.firebase.auth.FirebaseAuth
import kotlinx.coroutines.launch

class StorageViewModel(private val storageRepository: StorageRepository) : ViewModel(), StorageItemViewHolder.ClickListener {
    private val _isShowingProgress = MutableLiveData<Boolean>()
    private val _storageList = MutableLiveData<List<StorageProduct>>()
    private val _onScanClicked = MutableLiveData<StorageProduct>()

    val isShowingProgress: LiveData<Boolean> = _isShowingProgress
    val storageList: LiveData<List<StorageProduct>> = _storageList
    val onScanClicked :LiveData<StorageProduct> = _onScanClicked
    val mAuth = FirebaseAuth.getInstance()

    init {
        getStorageListData()
    }

    fun getStorageListData() {
        val userId = mAuth.currentUser?.uid
        if (userId == null) {
            return
        }
        viewModelScope.launch {
            _isShowingProgress.postValue(true)
            val shoppingList = storageRepository.getStorageList(userId)
            _storageList.postValue(shoppingList)
            _isShowingProgress.postValue(false)
        }
    }

    override fun onTimePickerClicked(item: StorageProduct) {
        Log.d("NUSH", "onInfoClicked")
        val userId = mAuth.currentUser?.uid
        if (userId == null) {
            return
        }
        viewModelScope.launch {
            _isShowingProgress.postValue(true)
            val isUpdated = storageRepository.updateStorageProductDate(userId, item)
            if (isUpdated) {
                val temporaryFavouriteList = _storageList.value as MutableList
                if (temporaryFavouriteList.isNotEmpty()) {
                    temporaryFavouriteList.find { it.id == item.id }?.expirationDate = item.expirationDate
                    _storageList.postValue(temporaryFavouriteList)
                }
            }
            _isShowingProgress.postValue(false)
        }
    }

    override fun onDeleteItemClicked(item: StorageProduct) {
        Log.d("NUSH", "onDeleteItemClicked")
        val userId = mAuth.currentUser?.uid
        if (userId == null) {
            return
        }
        viewModelScope.launch {
            _isShowingProgress.postValue(true)
            val isDeleted = storageRepository.removeProductFromStorageList(userId, item)
            if (isDeleted) {
                val temporaryFavouriteList = _storageList.value as MutableList
                if (temporaryFavouriteList.isNotEmpty()) {
                    temporaryFavouriteList.removeIf { it.id == item.id }
                    _storageList.postValue(temporaryFavouriteList)
                }
            }
            _isShowingProgress.postValue(false)
        }
    }

    override fun onScanExpirationDateClicked(item: StorageProduct){
        Log.d("NUSH", "onScanExpirationDateClicked")
        _onScanClicked.postValue(item)
    }
}