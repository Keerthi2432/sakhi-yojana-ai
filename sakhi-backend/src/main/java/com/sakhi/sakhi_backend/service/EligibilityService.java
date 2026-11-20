
package com.sakhi.sakhi_backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.sakhi.sakhi_backend.dto.EligibilityRequest;
import com.sakhi.sakhi_backend.entity.Scheme;
import com.sakhi.sakhi_backend.repository.SchemeRepository;

@Service
public class EligibilityService {

    private final SchemeRepository schemeRepository;

    public EligibilityService(SchemeRepository schemeRepository) {
        this.schemeRepository = schemeRepository;
    }

    public List<Scheme> findPotentialMatches(EligibilityRequest request) {

        List<Scheme> schemes =
                schemeRepository.findByStateIgnoreCase(request.getState());

        return schemes.stream()
                .filter(scheme -> {

                    Integer age = request.getAge();

                    if (age == null) {
                        return true;
                    }

                    Integer minimumAge = scheme.getMinimumAge();
                    Integer maximumAge = scheme.getMaximumAge();

                    if (minimumAge != null && age < minimumAge) {
                        return false;
                    }

                    if (maximumAge != null && age > maximumAge) {
                        return false;
                    }

                    return true;
                })
                .collect(Collectors.toList());
    }
}
