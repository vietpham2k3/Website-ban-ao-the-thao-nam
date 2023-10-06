//package com.example.demo.schedule;
//
//import com.example.demo.entity.KhuyenMai;
//import com.example.demo.repository.KhuyenMaiRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Component;
//
//import java.util.Date;
//import java.util.List;
//
//@Component
//public class ScheduleKhuyenMai {
//
//    @Autowired
//    KhuyenMaiRepository khRepo;
//
//    @Scheduled(fixedRate = 60000) // Ví dụ: cứ mỗi phút sẽ kiểm tra và cập nhật trạng thái
//    public void autoUpdatePromotionStatus() {
//        Date currentDateTime = new Date();
//        List<KhuyenMai> ongoingPromotions = khRepo.findByThoiGianAndTrangThai(currentDateTime,)
//        List<KhuyenMai> expiredPromotions =
//
//        for (KhuyenMai promotion : ongoingPromotions) {
//            promotion.setTrangThai("Đang diễn ra");
//            service.update(promotion);
//        }
//
//        for (KhuyenMai promotion : expiredPromotions) {
//            promotion.setTrangThai("Đã kết thúc");
//            service.update(promotion);
//        }
//    }
//}
