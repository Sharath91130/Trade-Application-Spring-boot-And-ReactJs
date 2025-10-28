package com.sharath.bank.chatService.repository;


import com.sharath.bank.chatService.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Users,Long> {

    Users findByUsername(String username);

    Users findByEmail(String email);
}
