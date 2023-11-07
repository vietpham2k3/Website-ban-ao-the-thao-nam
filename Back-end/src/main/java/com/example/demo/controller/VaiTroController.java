package com.example.demo.controller;

import com.example.demo.entity.VaiTro;
import com.example.demo.service.VaiTroService;
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
@RequestMapping("/api/vai-tro")
public class VaiTroController {

    @Autowired
    private VaiTroService vaiTroService;

    @GetMapping("/hienthi")
    public ResponseEntity<?> page(@RequestParam(value = "page", defaultValue = "0") Integer page) {
        return ResponseEntity.ok(vaiTroService.fillAll(page));
    }

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(vaiTroService.getAll());
    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@RequestBody VaiTro vaiTro) {
        String ma = "VT" + new Random().nextInt(100000);
        vaiTro.setMa(ma);
        return ResponseEntity.ok(vaiTroService.add(vaiTro));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable UUID id, @RequestBody VaiTro vaiTro) {
        vaiTro.setId(id);
        return ResponseEntity.ok(vaiTroService.update(vaiTro));
    }

    @PutMapping("/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable UUID id,
                                    @RequestBody VaiTro vaiTro) {
        vaiTro.setId(id);
        return ResponseEntity.ok(vaiTroService.delete(id));
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> detail(@PathVariable UUID id) {
        return ResponseEntity.ok(vaiTroService.detail(id));
    }

    @GetMapping("/serach")
    public ResponseEntity<?> hienThiPageSearch(String key,Integer trangThai,@RequestParam (defaultValue = "0") int page){
        Pageable pageable = PageRequest.of(page,5);
        return ResponseEntity.ok(vaiTroService.pageSearchMS(key,trangThai,pageable));

    }
}
