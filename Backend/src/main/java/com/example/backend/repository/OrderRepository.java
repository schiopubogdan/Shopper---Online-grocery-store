package com.example.backend.repository;

import com.example.backend.entity.Order;
import com.example.backend.entity.Status;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Repository
public class OrderRepository {
    private static  final String COLLECTION_NAME = "order_details";

    public Order save(Order dto) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference addedDocRef = dbFirestore.collection(COLLECTION_NAME).document();
        String idCurrent = addedDocRef.getId();
        dto.setId(idCurrent);
        ApiFuture<WriteResult> collectionApiFuture =
                dbFirestore.collection(COLLECTION_NAME).document(dto.getId()).set(dto);
        return dto;
    }
    public Order findById(String id) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COLLECTION_NAME).document(id);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot documentSnapshot = future.get();
        Order order = null;
        if(documentSnapshot.exists())
        {
            order = documentSnapshot.toObject(Order.class);
            return order;
        }
        return null;
    }
    public String deleteById(String id) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = dbFirestore.collection(COLLECTION_NAME).document(id).delete();
        return "Document with ID "+ id+" has been deleted";
    }
    public Order updateById(Order dto) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture =
                dbFirestore.collection(COLLECTION_NAME).document(dto.getId()).set(dto);
        return dto;
    }
    public List<Order> findAll() throws ExecutionException, InterruptedException {
        List<Order> orders = new ArrayList<>();
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = dbFirestore.collection(COLLECTION_NAME).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        for (QueryDocumentSnapshot document : documents) {
            orders.add(document.toObject(Order.class));
        }
        return orders;
    }
    public List<Order> findByStatus(String status) throws ExecutionException, InterruptedException {
        List<Order> orders = new ArrayList<>();
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = dbFirestore.collection(COLLECTION_NAME).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        for (QueryDocumentSnapshot document : documents) {
            orders.add(document.toObject(Order.class));
        }
        List<Order> filteredOrders = new ArrayList<>();
        Status orderStatus = Status.valueOf(status.toUpperCase());

        for(Order o : orders) {
            if(o.getStatus().equals(orderStatus)) {
                filteredOrders.add(o);
            }
        }
        return filteredOrders;
    }
    public List<Order> findByUserId(String id) throws ExecutionException, InterruptedException {
        List<Order> orders = new ArrayList<>();
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = dbFirestore.collection(COLLECTION_NAME).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        for (QueryDocumentSnapshot document : documents) {
            orders.add(document.toObject(Order.class));
        }
        List<Order> filteredOrders = new ArrayList<>();
        for(Order o : orders) {
            if(o.getUserId().equals(id)) {
                filteredOrders.add(o);
            }
        }
        return filteredOrders;
    }
}
