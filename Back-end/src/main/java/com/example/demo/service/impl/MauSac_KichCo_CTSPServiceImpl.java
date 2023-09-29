package com.example.demo.service.impl;

import com.example.demo.entity.MauSac_KichCo_CTSP;
import com.example.demo.repository.MauSac_KichCo_CTSPReposiory;
import com.example.demo.service.MauSac_KichCo_CTSPService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class MauSac_KichCo_CTSPServiceImpl implements MauSac_KichCo_CTSPService {

    @Autowired
    private MauSac_KichCo_CTSPReposiory reposiory;

    @Override
    public List<MauSac_KichCo_CTSP> getAllById(UUID id) {
        return reposiory.getAll(id);
    }

    @Override
    public MauSac_KichCo_CTSP add(MauSac_KichCo_CTSP mauSac_kichCo_ctsp) {
        return reposiory.save(mauSac_kichCo_ctsp);
    }
}
