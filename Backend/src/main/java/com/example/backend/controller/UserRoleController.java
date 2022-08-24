package com.example.backend.controller;

import com.example.backend.entity.UserRole;
import com.example.backend.service.UserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@CrossOrigin
@RequestMapping("/api/user")
public class UserRoleController {

    @Autowired
    private UserRoleService userRoleService;

    @GetMapping("/get")
    public ResponseEntity findById(@RequestParam String id) throws ExecutionException,
            InterruptedException {

        return ResponseEntity.status(HttpStatus.OK).body(userRoleService.findByUserId(id));
    }
    @GetMapping
    public ResponseEntity get() throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(userRoleService.findAll());
    }
    @GetMapping("/employees")
    public ResponseEntity getEmployees() throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(userRoleService.getEmployees());
    }

    @PostMapping
    public ResponseEntity save(@RequestBody UserRole dto) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(userRoleService.save(dto));
    }
    @PutMapping
    public ResponseEntity updateById(@RequestBody UserRole dto) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(userRoleService.updateById(dto));
    }
    @DeleteMapping
    public ResponseEntity deleteById(@RequestParam String id) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(userRoleService.deleteById(id));
    }
    @GetMapping("/info")
    public ResponseEntity getClientInfo(@RequestParam String id) throws ExecutionException,
            InterruptedException {
        return ResponseEntity.status(HttpStatus.OK).body(userRoleService.getClientInfo(id));
    }
}
