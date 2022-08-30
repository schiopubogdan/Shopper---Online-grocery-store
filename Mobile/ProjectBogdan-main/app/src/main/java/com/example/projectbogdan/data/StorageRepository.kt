package com.example.projectbogdan.data

import com.example.projectbogdan.data.model.StorageDetails
import com.example.projectbogdan.data.model.StorageProduct
import com.google.firebase.firestore.ktx.toObjects

class StorageRepository(private val dataSource: ProductsDataSource) {

    suspend fun getStorageList(userId: String) : List<StorageProduct>{
        val querySnapshot = dataSource.getStorageList(userId)
        val storageList = querySnapshot?.toObjects(StorageDetails::class.java)
        return storageList?.first()?.products ?: emptyList()
    }

    suspend fun removeProductFromStorageList(userId: String, product: StorageProduct): Boolean {
        return dataSource.removeFromStorageList(userId, product)
    }

    suspend fun updateStorageProductDate(
        userId: String,
        product: StorageProduct
    ): Boolean {
        return dataSource.updateStorageProductDate(userId, product)
    }
}