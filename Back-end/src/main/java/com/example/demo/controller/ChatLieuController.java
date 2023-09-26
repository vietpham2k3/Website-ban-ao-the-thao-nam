package com.example.demo.controller;

import com.example.demo.entity.ChatLieu;
import com.example.demo.service.ChatLieuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/chatlieu")
public class ChatLieuController {
    @Autowired
    private ChatLieuService chatLieuService;

    @GetMapping("")
    public ResponseEntity<?> page(@RequestParam(value = "page", defaultValue = "0") Integer page) {
        return ResponseEntity.ok(chatLieuService.getAll(page));
    }

    @GetMapping("/serach")
    public ResponseEntity<?> serach(@RequestParam(value = "page", defaultValue = "0") Integer page, @RequestParam("key") String key) {
        return ResponseEntity.ok(chatLieuService.serach(page, key));

    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(chatLieuService.fillAll());
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody ChatLieu chatLieu) {
        return ResponseEntity.ok(chatLieuService.add(chatLieu));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id, @RequestBody ChatLieu chatLieu) {
        chatLieu.setId(id);
        return ResponseEntity.ok(chatLieuService.update(chatLieu));
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id,@RequestBody ChatLieu chatLieu) {
        return ResponseEntity.ok(chatLieuService.delete(id,chatLieu));
    }


}

