package com.example.backend.repository;

import com.example.backend.models.Coupon;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Repository
public class CouponRepository {
    private static  final String COLLECTION_NAME = "coupon_details";

    public Coupon save(Coupon dto) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference addedDocRef = dbFirestore.collection(COLLECTION_NAME).document();
        String idCurrent = addedDocRef.getId();
        dto.setId(idCurrent);
        ApiFuture<WriteResult> collectionApiFuture =
                dbFirestore.collection(COLLECTION_NAME).document(dto.getId()).set(dto);
        return dto;
    }
    public Coupon findById(String id) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection(COLLECTION_NAME).document(id);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot documentSnapshot = future.get();
        Coupon coupon = null;
        if(documentSnapshot.exists())
        {
            coupon = documentSnapshot.toObject(Coupon.class);
            return coupon;
        }
        return null;
    }
    public String deleteById(String id) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = dbFirestore.collection(COLLECTION_NAME).document(id).delete();
        return "Document with ID "+ id+" has been deleted";
    }
    public Coupon updateById(Coupon dto) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture =
                dbFirestore.collection(COLLECTION_NAME).document(dto.getId()).set(dto);
        return dto;
    }
    public List<Coupon> findAll() throws ExecutionException, InterruptedException {
        List<Coupon> results = new ArrayList<>();
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = dbFirestore.collection(COLLECTION_NAME).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        for (QueryDocumentSnapshot document : documents) {
            results.add(document.toObject(Coupon.class));
        }
        return results;
    }
    public List<Coupon> findByUserId(String id) throws ExecutionException, InterruptedException {
        List<Coupon> coupons = new ArrayList<>();
        List<Coupon> userCoupons = new ArrayList<>();
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = dbFirestore.collection(COLLECTION_NAME).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        for (QueryDocumentSnapshot document : documents) {
            coupons.add(document.toObject(Coupon.class));
        }
        for(Coupon c : coupons) {
            if(id.equals(c.getUserId())) {
                userCoupons.add(c);
            }
        }
        return userCoupons;
    }
    public Coupon checkCouponCode(String couponCode) throws ExecutionException, InterruptedException {
        List<Coupon> coupons = new ArrayList<>();
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = dbFirestore.collection(COLLECTION_NAME).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        for (QueryDocumentSnapshot document : documents) {
            coupons.add(document.toObject(Coupon.class));
        }
        Coupon coupon = null;
        for(Coupon c : coupons) {
            if(c.getCode().equals(couponCode)) {
                coupon = c;
            }
        }
        return coupon;
    }
}
