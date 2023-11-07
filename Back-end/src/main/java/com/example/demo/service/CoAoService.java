package com.example.demo.service;

import com.example.demo.entity.ChatLieu;
import com.example.demo.entity.CoAo;
import com.example.demo.entity.MauSac;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface CoAoService {

    List<CoAo> getAll();

    public Page<CoAo> pageSearchMS(String key, Integer trangThai, Pageable pageable);

    Page<CoAo> fillAll(Integer page);

    CoAo getOne(UUID id);

    public CoAo detail(UUID id);

    CoAo add(CoAo coAo);

    CoAo update(CoAo coAo);

    CoAo delete(UUID id);

    List<CoAo> findByCoAoString (List<String> coAoString) ;
}
