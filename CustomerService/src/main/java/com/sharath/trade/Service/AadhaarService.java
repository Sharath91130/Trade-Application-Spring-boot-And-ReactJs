package com.sharath.trade.Service;

import com.sharath.trade.config.SSLBypass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AadhaarService {
    @Autowired
    SSLBypass sslBypass;

    public String getAadhaarOTP(String aadhar) throws Exception {
        sslBypass.disableSslVerification();
        String url = "https://staging.eko.in/ekoapi/v1/external/getAdhaarOTP" +
                "?source=NEWCONNECT" +
                "&initiator_id=9971771929" +
                "&aadhar=" + aadhar +
                "&is_consent=Y" +
                "&access_key=YOUR_ACCESS_KEY" +
                "&caseId=" + aadhar +
                "&user_code=20110001" +
                "&realsourceip=192.168.1.10";

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("developer_key", "YOUR_DEVELOPER_KEY");
        headers.set("secret-key", "YOUR_SECRET_KEY");
        headers.set("secret-key-timestamp", "1516705204593");

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

        return response.getBody();
    }
}
