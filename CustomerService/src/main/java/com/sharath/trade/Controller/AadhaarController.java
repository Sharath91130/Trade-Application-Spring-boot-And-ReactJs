package com.sharath.trade.Controller;


import com.sharath.trade.Service.AadhaarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/aadhaar")
public class AadhaarController {

    @Autowired
    private AadhaarService aadhaarService;

    @GetMapping("/otp")
    public ResponseEntity<String> getOtp(@RequestParam String aadhar) throws Exception {

        String response = aadhaarService.getAadhaarOTP(aadhar);
        return ResponseEntity.ok(response);
    }
}
