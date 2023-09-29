package com.example.demo.controller;

import com.example.demo.entity.ChatLieu;
import com.example.demo.entity.CoAo;
import com.example.demo.service.impl.CoAoServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

import java.util.Random;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/co-ao")
public class CoAoController {

    @Autowired
    private CoAoServiceImpl service;

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/hienthi")
    public ResponseEntity<?> page(@RequestParam(value = "page", defaultValue = "0") Integer page) {
        return ResponseEntity.ok(service.fillAll(page));
    }

    @GetMapping("/serach")
    public ResponseEntity<?> hienThiPageSearch(String key,Integer trangThai,@RequestParam (defaultValue = "0") int page){
        Pageable pageable = PageRequest.of(page,5);
        return ResponseEntity.ok(service.pageSearchMS(key,trangThai,pageable));

    }


    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody CoAo coAo) {
        String ma = "CA" + new Random().nextInt(100000);
        coAo.setMa(ma);
        return ResponseEntity.ok(service.add(coAo));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id, @RequestBody CoAo coAo) {
        coAo.setId(id);
        return ResponseEntity.ok(service.update(coAo));
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id,
                                    @RequestBody CoAo coAo) {

        coAo.setId(id);
        return ResponseEntity.ok(service.delete(id));
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> detail(@PathVariable UUID id) {
        return ResponseEntity.ok(service.detail(id));
    }

}
