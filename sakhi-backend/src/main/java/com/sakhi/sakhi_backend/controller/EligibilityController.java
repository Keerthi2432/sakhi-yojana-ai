
package com.sakhi.sakhi_backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sakhi.sakhi_backend.dto.EligibilityRequest;
import com.sakhi.sakhi_backend.entity.Scheme;
import com.sakhi.sakhi_backend.service.EligibilityService;

@RestController
@RequestMapping("/api/eligibility")
@CrossOrigin(origins = "http://localhost:5173")
public class EligibilityController {

    private final EligibilityService eligibilityService;

    public EligibilityController(EligibilityService eligibilityService) {
        this.eligibilityService = eligibilityService;
    }

    @PostMapping("/check")
    public List<Scheme> checkEligibility(
            @RequestBody EligibilityRequest request) {

        return eligibilityService.findPotentialMatches(request);
    }
}
