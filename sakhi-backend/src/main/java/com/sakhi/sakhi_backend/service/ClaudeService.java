
package com.sakhi.sakhi_backend.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

@Service
public class ClaudeService {

    private final RestClient restClient;
    private final String apiKey;
    private final String model;

    public ClaudeService(
            RestClient.Builder builder,
            @Value("${ANTHROPIC_API_KEY}") String apiKey,
            @Value("${ANTHROPIC_MODEL:claude-sonnet-4-5-20250929}") String model) {

        this.restClient = builder
                .baseUrl("https://api.anthropic.com")
                .build();

        this.apiKey = apiKey;
        this.model = model;
    }

    public String getResponse(String userMessage) {

        Map<String, Object> requestBody = Map.of(
                "model", model,
                "max_tokens", 800,
                "system",
                "You are Sakhi AI, a friendly and knowledgeable assistant " +
                "for women in India. Explain government schemes in simple " +
                "language. Help users understand eligibility, benefits, " +
                "application procedures and required documents. " +
                "Never invent schemes, eligibility rules, benefits or links. " +
                "Clearly advise users to verify details through official " +
                "government sources. Never guarantee scheme approval.",

                "messages", List.of(
                        Map.of(
                                "role", "user",
                                "content", userMessage
                        )
                )
        );

        try {

            Map response = restClient.post()
                    .uri("/v1/messages")
                    .header("x-api-key", apiKey)
                    .header("anthropic-version", "2023-06-01")
                    .header("content-type", "application/json")
                    .body(requestBody)
                    .retrieve()
                    .body(Map.class);

            if (response == null || response.get("content") == null) {
                return "I'm sorry, I couldn't generate a response. Please try again.";
            }

            List<Map<String, Object>> content =
                    (List<Map<String, Object>>) response.get("content");

            if (content.isEmpty()) {
                return "I'm sorry, I couldn't generate a response. Please try again.";
            }

            return String.valueOf(content.get(0).get("text"));

        } catch (RestClientResponseException e) {

            System.err.println("CLAUDE API STATUS: " + e.getStatusCode());
            System.err.println("CLAUDE API ERROR: " + e.getResponseBodyAsString());

            throw new RuntimeException(
                    "Claude API request failed: " + e.getStatusCode()
            );

        } catch (Exception e) {

            System.err.println("CLAUDE SERVICE ERROR: " + e.getMessage());

            throw new RuntimeException("Unable to connect to Sakhi AI.");
        }
    }
}
