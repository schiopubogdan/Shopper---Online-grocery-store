package com.example.backend.repository;

import com.example.backend.entity.Product;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Repository
public class ProductRepository {
    private static  final String COLLECTION_NAME = "product_details";

    public Product save(Product dto) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference addedDocRef = dbFirestore.collection(COLLECTION_NAME).document();
        String idCurrent = addedDocRef.getId();
        dto.setId(idCurrent);
        ApiFuture<WriteResult> collectionApiFuture =
                dbFirestore.collection(COLLECTION_NAME).document(dto.getId()).set(dto);
        return dto;
    }
    public Product findById(String id) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COLLECTION_NAME).document(id);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot documentSnapshot = future.get();
        Product product = null;
        if(documentSnapshot.exists())
        {
            product = documentSnapshot.toObject(Product.class);
            return product;
        }
        return null;
    }
    public String deleteById(String id) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = dbFirestore.collection(COLLECTION_NAME).document(id).delete();
        return "Document with ID "+ id+" has been deleted";
    }
    public Product updateById(Product dto) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture =
                dbFirestore.collection(COLLECTION_NAME).document(dto.getId()).set(dto);
        return dto;
    }
//    public List<Product> findAll() throws ExecutionException, InterruptedException {
//        List<Product> results = new ArrayList<>();
//        Firestore dbFirestore = FirestoreClient.getFirestore();
//        ApiFuture<QuerySnapshot> future = dbFirestore.collection(COLLECTION_NAME).get();
//        List<QuerySnapshot> documents = future.get().getDocuments();
//        for (QueryDocumentSnapshot document : documents) {
//            results.add(document.toObject(Product.class));
//        }
//        return results;
//    }

}
