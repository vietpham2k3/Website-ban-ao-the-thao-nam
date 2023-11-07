package com.example.demo.service;

import com.example.demo.entity.VaiTro;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface VaiTroService {

    Page<VaiTro> fillAll(Integer page);

    List<VaiTro> getAll();

    VaiTro getOne(UUID id);

    public VaiTro detail(UUID id);

    VaiTro add(VaiTro vaiTro);

    VaiTro update(VaiTro vaiTro);

    VaiTro delete(UUID id);

    public Page<VaiTro> pageSearchMS(String key, Integer trangThai, Pageable pageable);

}
