package com.example.backend.controller;

import com.example.backend.dto.OrderDTO;
import com.example.backend.models.Order;
import com.example.backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin
@RequestMapping("/api/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/get")
    public ResponseEntity findById(@RequestParam String id) throws ExecutionException,
            InterruptedException {

        return ResponseEntity.status(HttpStatus.OK).body(orderService.findById(id));
    }
    @GetMapping("/get-by-status")
    public ResponseEntity findByStatus(@RequestParam String status) throws ExecutionException,
            InterruptedException {

        return ResponseEntity.status(HttpStatus.OK).body(orderService.findByStatus(status));
    }
    @GetMapping("/get-by-userid")
    public ResponseEntity findByUserId(@RequestParam String id) throws ExecutionException,
            InterruptedException {

        return ResponseEntity.status(HttpStatus.OK).body(orderService.findByUserId(id));
    }
    @GetMapping
    public ResponseEntity get() throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(orderService.findAll());
    }

    @PostMapping
    public ResponseEntity save(@RequestBody Order dto) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(orderService.save(dto));
    }
    @PutMapping
    public ResponseEntity updateById(@RequestBody Order dto) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(orderService.updateById(dto));
    }
    @DeleteMapping
    public ResponseEntity deleteById(@RequestParam String id) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(orderService.deleteById(id));
    }
    @PostMapping("/promote")
    public ResponseEntity promote(@RequestBody OrderDTO dto) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(orderService.promote(dto.getOrderId(),dto.getWorkerId(),dto.getDriverId()));
    }
}
