package com.example.demo.service;

import com.example.demo.dto.ChatLieuCustom;
import com.example.demo.dto.ChatLieuRequest;
import com.example.demo.entity.ChatLieu;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface ChatLieuService {
    Page<ChatLieu> getAll(Integer page);

    Page<ChatLieu> serach(Integer page, String ten);

    List<ChatLieu> fillAll();

    ChatLieu getOne(UUID id);

    ChatLieu add(ChatLieu chatLieu);

    ChatLieu update(ChatLieu chatLieu);

    ChatLieu delete(UUID id, ChatLieu chatLieu);
}
