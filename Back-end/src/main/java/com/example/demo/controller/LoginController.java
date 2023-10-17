package com.example.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class LoginController {

//    @GetMapping("/profile")
//    public ResponseEntity<Map<String, String>> getProfile(@AuthenticationPrincipal OAuth2User principal) {
//        Map<String, String> profileData = new HashMap<>();
//        profileData.put("name", principal.getAttribute("name"));
//        profileData.put("email", principal.getAttribute("email"));
//        profileData.put("picture", principal.getAttribute("picture"));
//
//        return ResponseEntity.ok(profileData);
//    }
}
