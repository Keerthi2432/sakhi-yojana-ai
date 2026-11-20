
package com.sakhi.sakhi_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.sakhi.sakhi_backend.entity.Scheme;
import com.sakhi.sakhi_backend.repository.SchemeRepository;

@Service
public class SchemeService {

    private final SchemeRepository schemeRepository;

    public SchemeService(SchemeRepository schemeRepository) {
        this.schemeRepository = schemeRepository;
    }

    // Retrieve all schemes
    public List<Scheme> getAllSchemes() {
        return schemeRepository.findAll();
    }

    // Retrieve scheme by ID
    public Optional<Scheme> getSchemeById(Long id) {
        return schemeRepository.findById(id);
    }

    // Add a new scheme
    public Scheme addScheme(Scheme scheme) {
        return schemeRepository.save(scheme);
    }

    // Filter schemes by state
    public List<Scheme> getSchemesByState(String state) {
        return schemeRepository.findByStateIgnoreCase(state);
    }

    // Filter schemes by category
    public List<Scheme> getSchemesByCategory(String category) {
        return schemeRepository.findByCategoryIgnoreCase(category);
    }

    // Filter schemes by state and category
    public List<Scheme> getSchemesByStateAndCategory(
            String state, String category) {

        return schemeRepository
                .findByStateIgnoreCaseAndCategoryIgnoreCase(state, category);
    }
}
