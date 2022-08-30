package com.example.projectbogdan.data

import com.example.projectbogdan.data.model.StorageDetails
import com.example.projectbogdan.data.model.StorageProduct
import com.google.firebase.firestore.FieldValue
import com.google.firebase.firestore.QuerySnapshot
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase
import kotlinx.coroutines.tasks.await
import java.lang.Exception

class ProductsDataSource {
    val firestore = Firebase.firestore

    suspend fun getStorageList(userId: String) : QuerySnapshot? {
        return try {
            val data = firestore
                .collection("storage_details")
                .whereEqualTo("userId", userId)
                .get()
                .await()
            data
        } catch(e: Exception){
            null
        }
    }

suspend fun removeFromStorageList(userId: String, product: StorageProduct) : Boolean {
        return try {
            val productList = getStorageList(userId)?.toObjects(StorageDetails::class.java)?.first()
            (productList?.products as ArrayList<StorageProduct>).remove(product)
            firestore
                .collection("storage_details")
                .document(productList.id)
                .update("products", productList.products)
                .await()
            true
        } catch(e: Exception){
            false
        }
    }

    suspend fun addMultipleProductsToStorageList(userId: String, products: List<StorageProduct>): Boolean {
        return try {
            val batch = firestore.batch()
            products.forEach { storageProduct ->
                val docRef = firestore.collection("users")
                    .document(userId)
                    .collection("storageList")
                    .document()
                batch.set(docRef, storageProduct)
            }
            batch.commit().await()
            true
        } catch (e: Exception) {
            false
        }
    }

    suspend fun updateStorageProductDate(userId: String, product: StorageProduct): Boolean{
        return try {
            val productList = getStorageList(userId)?.toObjects(StorageDetails::class.java)?.first()
            (productList?.products as ArrayList<StorageProduct>).forEach {
                if (it.id == product.id) {
                    it.expirationDate = product.expirationDate
                }
            }
            firestore
                .collection("storage_details")
                .document(productList.id)
                .update("products", productList.products)
                .await()
            true
        } catch(e: Exception){
            false
        }
    }
}