
package com.sakhi.sakhi_backend.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sakhi.sakhi_backend.dto.ChatRequest;
import com.sakhi.sakhi_backend.service.ClaudeService;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin(origins = "http://localhost:5173")
public class AIController {

    private final ClaudeService claudeService;

    public AIController(ClaudeService claudeService) {
        this.claudeService = claudeService;
    }

    @PostMapping("/chat")
    public Map<String, String> chat(@RequestBody ChatRequest request) {

        if (request.getMessage() == null ||
                request.getMessage().isBlank()) {
            throw new IllegalArgumentException("Message cannot be empty");
        }

        String response =
                claudeService.getResponse(request.getMessage());

        return Map.of("reply", response);
    }
}
