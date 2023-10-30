package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;
@Getter
@Setter

public class DoiMatKhau {

    private String currentPassword;
    private String newPassword;
    private String confirmPassword;

}
