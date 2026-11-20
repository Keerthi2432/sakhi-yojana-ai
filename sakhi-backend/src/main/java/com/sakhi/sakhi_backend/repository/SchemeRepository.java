
package com.sakhi.sakhi_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sakhi.sakhi_backend.entity.Scheme;

public interface SchemeRepository extends JpaRepository<Scheme, Long> {

    List<Scheme> findByStateIgnoreCase(String state);

    List<Scheme> findByCategoryIgnoreCase(String category);

    List<Scheme> findByStateIgnoreCaseAndCategoryIgnoreCase(
            String state, String category
    );
}
