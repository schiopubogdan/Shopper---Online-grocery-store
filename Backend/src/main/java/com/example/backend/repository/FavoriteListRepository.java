package com.example.backend.repository;

import com.example.backend.models.FavoriteList;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Repository
public class FavoriteListRepository {
    private static  final String COLLECTION_NAME = "favorite_details";

    public FavoriteList save(FavoriteList dto) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference addedDocRef = dbFirestore.collection(COLLECTION_NAME).document();
        String idCurrent = addedDocRef.getId();
        dto.setId(idCurrent);
        ApiFuture<WriteResult> collectionApiFuture =
                dbFirestore.collection(COLLECTION_NAME).document(dto.getId()).set(dto);
        return dto;
    }
    public FavoriteList findById(String id) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COLLECTION_NAME).document(id);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot documentSnapshot = future.get();
        FavoriteList favoriteList = null;
        if(documentSnapshot.exists())
        {
            favoriteList = documentSnapshot.toObject(FavoriteList.class);
            return favoriteList;
        }
        return null;
    }
    public String deleteById(String id) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = dbFirestore.collection(COLLECTION_NAME).document(id).delete();
        return "Document with ID "+ id+" has been deleted";
    }
    public FavoriteList updateById(FavoriteList dto) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture =
                dbFirestore.collection(COLLECTION_NAME).document(dto.getId()).set(dto);
        return dto;
    }
    public List<FavoriteList> findAll() throws ExecutionException, InterruptedException {
        List<FavoriteList> results = new ArrayList<>();
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = dbFirestore.collection(COLLECTION_NAME).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        for (QueryDocumentSnapshot document : documents) {
            results.add(document.toObject(FavoriteList.class));
        }
        return results;
    }
    public FavoriteList findUserFavoriteList(String id)throws ExecutionException, InterruptedException {
        FavoriteList userFavoriteList = null;
        List<FavoriteList> results = new ArrayList<>();
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = dbFirestore.collection(COLLECTION_NAME).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        for (QueryDocumentSnapshot document : documents) {
            results.add(document.toObject(FavoriteList.class));
        }
        for(FavoriteList f : results) {
            if(f.getUserId().equals(id)){
                userFavoriteList = f;
            }
        }
        return userFavoriteList;
    }
}
