package com.sharath.bank.chatService.repository;


import com.sharath.bank.chatService.entity.ChatMessage;
import org.hibernate.annotations.Parent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
//    @Query("SELECT M FROM ChatMessage M WHERE M.senderName = :senderName AND M.receiverName = :receiverName AND M.message IS NOT NULL ORDER BY timestamp")
//    List<ChatMessage> findByReceiverNameOrSenderName(
//            @Param("senderName") String senderName,
//            @Param("receiverName") String receiverName);


    @Query("""
        SELECT m FROM ChatMessage m
        WHERE 
            (m.senderName = :user1 AND m.receiverName = :user2)
            OR
            (m.senderName = :user2 AND m.receiverName = :user1)
        ORDER BY m.timestamp ASC
    """)
    List<ChatMessage> findByReceiverNameOrSenderName(@Param("user1") String user1, @Param("user2") String user2);

}
