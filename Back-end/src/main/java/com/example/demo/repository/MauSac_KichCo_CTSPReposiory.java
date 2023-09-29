package com.example.demo.repository;

import com.example.demo.entity.MauSac_KichCo_CTSP;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MauSac_KichCo_CTSPReposiory extends JpaRepository<MauSac_KichCo_CTSP, UUID> {

    @Query(value = "select * from MauSac_KichCo_CTSP \n" +
            "where id_ctsp = :id", nativeQuery = true)
    List<MauSac_KichCo_CTSP> getAll(UUID id);
}
