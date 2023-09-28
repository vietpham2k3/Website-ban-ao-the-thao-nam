package com.example.demo.service;

import com.example.demo.entity.VaiTro;

import java.util.List;
import java.util.UUID;

public interface VaiTroService {

    List<VaiTro> getAll();

    VaiTro getOne(UUID id);
}
