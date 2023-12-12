package com.example.demo.controller;


import com.example.demo.service.impl.DoiHangServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/hang-loi")
public class HangLoiController {

    @Autowired
    public DoiHangServiceImpl doiHangService;

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll(@RequestParam(defaultValue = "0") Integer page) {
        return ResponseEntity.ok(doiHangService.page(page));
    }

    @GetMapping("/search")
    public ResponseEntity<?> getAll(@RequestParam(defaultValue = "0") Integer page,
                                    @RequestParam String key,
                                    @RequestParam String tuNgay,
                                    @RequestParam String denNgay) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm aa");
        Date tuNgayDate = null;
        Date denNgayDate = null;

        try {
            tuNgayDate = dateFormat.parse(tuNgay);
            denNgayDate = dateFormat.parse(denNgay);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok(doiHangService.search(key, tuNgayDate, denNgayDate, page));
    }
}
