package com.example.backend.repository;

import com.example.backend.entity.FavoriteList;
import com.example.backend.entity.StorageList;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Repository
public class StorageListRepository {
    private static  final String COLLECTION_NAME = "storage_details";

    public StorageList save(StorageList dto) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference addedDocRef = dbFirestore.collection(COLLECTION_NAME).document();
        String idCurrent = addedDocRef.getId();
        dto.setId(idCurrent);
        ApiFuture<WriteResult> collectionApiFuture =
                dbFirestore.collection(COLLECTION_NAME).document(dto.getId()).set(dto);
        return dto;
    }
    public StorageList findById(String id) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COLLECTION_NAME).document(id);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot documentSnapshot = future.get();
        StorageList storageList = null;
        if(documentSnapshot.exists())
        {
            storageList = documentSnapshot.toObject(StorageList.class);
            return storageList;
        }
        return null;
    }
    public String deleteById(String id) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = dbFirestore.collection(COLLECTION_NAME).document(id).delete();
        return "Document with ID "+ id+" has been deleted";
    }
    public StorageList updateById(StorageList dto) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture =
                dbFirestore.collection(COLLECTION_NAME).document(dto.getId()).set(dto);
        return dto;
    }
    public List<StorageList> findAll() throws ExecutionException, InterruptedException {
        List<StorageList> results = new ArrayList<>();
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = dbFirestore.collection(COLLECTION_NAME).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        for (QueryDocumentSnapshot document : documents) {
            results.add(document.toObject(StorageList.class));
        }
        return results;
    }
    public StorageList findUserStorageList(String id)throws ExecutionException, InterruptedException {
        StorageList storageList = null;
        List<StorageList> results = new ArrayList<>();
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = dbFirestore.collection(COLLECTION_NAME).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        for (QueryDocumentSnapshot document : documents) {
            results.add(document.toObject(StorageList.class));
        }
        for(StorageList f : results) {
            if(f.getUserId().equals(id)){
                storageList = f;
            }
        }
        return storageList;
    }
}
