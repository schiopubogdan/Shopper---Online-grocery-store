package com.example.backend.repository;

import com.example.backend.entity.StorageProduct;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Repository
public class StorageProductRepository {
    private static  final String COLLECTION_NAME = "storage_product_details";

    public StorageProduct save(StorageProduct dto) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference addedDocRef = dbFirestore.collection(COLLECTION_NAME).document();
        String idCurrent = addedDocRef.getId();
        dto.setId(idCurrent);
        ApiFuture<WriteResult> collectionApiFuture =
                dbFirestore.collection(COLLECTION_NAME).document(dto.getId()).set(dto);
        return dto;
    }
    public StorageProduct findById(String id) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COLLECTION_NAME).document(id);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot documentSnapshot = future.get();
        StorageProduct storageProduct = null;
        if(documentSnapshot.exists())
        {
            storageProduct = documentSnapshot.toObject(StorageProduct.class);
            return storageProduct;
        }
        return null;
    }

    public String deleteById(String id) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = dbFirestore.collection(COLLECTION_NAME).document(id).delete();
        return "Document with ID "+ id+" has been deleted";
    }
    public StorageProduct updateById(StorageProduct dto) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture =
                dbFirestore.collection(COLLECTION_NAME).document(dto.getId()).set(dto);
        return dto;
    }
    public List<StorageProduct> findAll() throws ExecutionException, InterruptedException {
        List<StorageProduct> results = new ArrayList<>();
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = dbFirestore.collection(COLLECTION_NAME).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        for (QueryDocumentSnapshot document : documents) {
            results.add(document.toObject(StorageProduct.class));
        }
        return results;
    }
}
