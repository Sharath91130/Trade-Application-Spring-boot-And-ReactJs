package com.sharath.bank.chatService.model;

import lombok.Data;

@Data
public class UserDto {
    private String username;
    private String name;
    private String email;
    private String password;
}
