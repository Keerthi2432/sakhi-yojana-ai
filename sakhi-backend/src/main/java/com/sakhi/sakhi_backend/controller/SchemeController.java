
package com.sakhi.sakhi_backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sakhi.sakhi_backend.entity.Scheme;
import com.sakhi.sakhi_backend.service.SchemeService;

@RestController
@RequestMapping("/api/schemes")
@CrossOrigin(origins = "http://localhost:5173")
public class SchemeController {

    private final SchemeService schemeService;

    public SchemeController(SchemeService schemeService) {
        this.schemeService = schemeService;
    }

    // Get all schemes
    @GetMapping
    public List<Scheme> getAllSchemes() {
        return schemeService.getAllSchemes();
    }

    // Get scheme by ID
    @GetMapping("/{id}")
    public ResponseEntity<Scheme> getSchemeById(@PathVariable Long id) {
        return schemeService.getSchemeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Add a new scheme
    @PostMapping
    public ResponseEntity<Scheme> addScheme(@RequestBody Scheme scheme) {
        Scheme savedScheme = schemeService.addScheme(scheme);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedScheme);
    }

    // Get schemes by state
    @GetMapping("/state/{state}")
    public List<Scheme> getSchemesByState(@PathVariable String state) {
        return schemeService.getSchemesByState(state);
    }

    // Get schemes by category
    @GetMapping("/category/{category}")
    public List<Scheme> getSchemesByCategory(
            @PathVariable String category) {
        return schemeService.getSchemesByCategory(category);
    }

    // Get schemes by state and category
    @GetMapping("/filter")
    public List<Scheme> getSchemesByStateAndCategory(
            @RequestParam String state,
            @RequestParam String category) {
        return schemeService.getSchemesByStateAndCategory(state, category);
    }
}
